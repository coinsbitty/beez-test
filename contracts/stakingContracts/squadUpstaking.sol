pragma solidity ^0.6.0;
import "./Squad.sol";

contract Percentage {
    uint256 public baseValue = 100;

    function onePercent(uint256 _value) internal view returns (uint256) {
        uint256 roundValue = SafeMath.ceil(_value, baseValue);
        uint256 Percent =
            SafeMath.div(SafeMath.mul(roundValue, baseValue), 10000);
        return Percent;
    }
}

contract squadUpv2Exchange is SquadUpV2, Percentage {
    /*=================================
    =            MODIFIERS            =
    =================================*/
    // only people with tokens
    modifier onlybelievers() {
        require(balanceOf(msg.sender) > 0);
        _;
    }

    // admin can:
    // -> change the name of the contract
    // -> change the name of the token
    // -> change the PoS difficulty
    // they CANNOT:
    // -> take funds
    // -> disable withdrawals
    // -> kill the contract
    // -> change the price of tokens
    modifier onlyAdmin() {
        require(msg.sender == owner, "Only can owner can call!");
        _;
    }
    /*==============================
    =            EVENTS            =
    ==============================*/
    event onTokenPurchase(
        address indexed customerAddress,
        uint256 incomingEthereum,
        uint256 tokensMinted,
        address indexed referredBy
    );

    event onTokenSell(
        address indexed customerAddress,
        uint256 tokensBurned,
        uint256 ethereumEarned
    );

    event onWithdraw(
        address indexed customerAddress,
        uint256 ethereumWithdrawn
    );

    // ERC20
    event Transfer(address indexed from, address indexed to, uint256 tokens);

    /*=====================================
    =            CONFIGURABLES            =
    =====================================*/
    address payable owner;
    uint256 internal constant dividendFee_ = 8;
    uint256 internal constant refferalBonus = 2;
    uint256 internal constant tokenPriceInitial_ = 0.005 ether;
    uint256 internal constant tokenPriceIncremental_ = 0.00001 ether;
    uint256 internal constant magnitude = 2**64;

    // proof of stake (defaults at 1 token)

    // ambassador program
    mapping(address => bool) internal ambassadors_;
    uint256 internal constant ambassadorMaxPurchase_ = 1 ether;
    uint256 internal constant ambassadorQuota_ = 1 ether;

    /*================================
    =            DATASETS            =
    ================================*/
    // amount of shares for each address (scaled number)
    mapping(address => int256) internal payoutsTo_;
    mapping(address => uint256) internal ambassadorAccumulatedQuota_;
    uint256 internal profitPerShare_;

    // administrator list (see above on what they can do)
    mapping(bytes32 => bool) public administrators;

    bool public onlyAmbassadors = false;

    /*=======================================
    =            PUBLIC FUNCTIONS            =
    =======================================*/
    /*
     * -- APPLICATION ENTRY POINTS --
     */
    constructor() public {
        // add administrators here
        administrators[
            0x9bcc16873606dc04acb98263f74c420525ddef61de0d5f18fd97d16de659131a
        ] = true;

        ambassadors_[0x0000000000000000000000000000000000000000] = true;

        owner = msg.sender;
    }

    /**
     * Converts all incoming Ethereum to tokens for the caller, and passes down the referral address (if any)
     */
    function buy(address payable _referredBy) public payable returns (uint256) {
        purchaseTokens(msg.value, _referredBy);
    }

    /**
     * Liquifies tokens to ethereum.
     */
    function sell(uint256 _amountOfTokens) public onlybelievers() {
        address payable _customerAddress = msg.sender;

        require(_amountOfTokens <= balanceOf(_customerAddress));
        uint256 _tokens = _amountOfTokens;
        uint256 _ethereum = tokensToEthereum_(_tokens);
        // burn the sold tokens
        _burn(_customerAddress, _amountOfTokens);
        //send bnb back to seller
        _customerAddress.transfer(_ethereum);
        // fire event
        emit onTokenSell(_customerAddress, _tokens, _ethereum);
    }

    /*----------  ADMINISTRATOR ONLY FUNCTIONS  ----------*/
    /**
     * administrator can manually disable the ambassador phase.
     */
    function disableInitialStage() public onlyAdmin() {
        onlyAmbassadors = false;
    }

    function setAdministrator(bytes32 _identifier, bool _status)
        public
        onlyAdmin()
    {
        administrators[_identifier] = _status;
    }

    /*----------  HELPERS AND CALCULATORS  ----------*/
    /**
     * Method to view the current Ethereum stored in the contract
     * Example: totalEthereumBalance()
     */
    function totalEthereumBalance() public view returns (uint256) {
        return address(this).balance;
    }

    /**
     * Return the buy price of 1 individual token.
     */
    function sellPrice() public view returns (uint256) {
        if (totalSupply() == 0) {
            return tokenPriceInitial_ - tokenPriceIncremental_;
        } else {
            uint256 _ethereum = tokensToEthereum_(1e18);
            uint256 _dividends = SafeMath.div(_ethereum, dividendFee_);
            uint256 _taxedEthereum = SafeMath.sub(_ethereum, _dividends);
            return _taxedEthereum;
        }
    }

    /**
     * Return the sell price of 1 individual token.
     */
    function buyPrice() public view returns (uint256) {
        if (totalSupply() == 0) {
            return tokenPriceInitial_ + tokenPriceIncremental_;
        } else {
            uint256 _ethereum = tokensToEthereum_(1e18);
            uint256 _dividends = SafeMath.div(_ethereum, dividendFee_);
            uint256 _taxedEthereum = SafeMath.add(_ethereum, _dividends);
            return _taxedEthereum;
        }
    }


    function calculateTokensReceived(uint256 _incomingEthereum)
        public
        view
        returns (uint256)
    {
        uint256 refBonus =
            SafeMath.mul(refferalBonus, onePercent(_incomingEthereum));
        uint256 adminFee =
            SafeMath.mul(dividendFee_, onePercent(_incomingEthereum));
        uint256 totalFee = SafeMath.add(adminFee, refBonus);
        uint256 _taxedEthereum = SafeMath.sub(_incomingEthereum, totalFee);
        uint256 _amountOfTokens = ethereumToTokens_(_taxedEthereum);
        return _amountOfTokens;
    }

    function calculateEthereumReceived(uint256 _tokensToSell)
        public
        view
        returns (uint256)
    {
        require(_tokensToSell <= totalSupply());
        uint256 _ethereum = tokensToEthereum_(_tokensToSell);
        return _ethereum;
    }

    /*==========================================
    =            INTERNAL FUNCTIONS            =
    ==========================================*/
    function purchaseTokens(
        uint256 _incomingEthereum,
        address payable _referredBy
    ) internal returns (uint256) {
        // data setup
        address _customerAddress = msg.sender;
        uint256 refBonus =
            SafeMath.mul(refferalBonus, onePercent(_incomingEthereum));
        uint256 adminFee =
            SafeMath.mul(dividendFee_, onePercent(_incomingEthereum));
        uint256 totalFee = SafeMath.add(adminFee, refBonus);
        uint256 _taxedEthereum = SafeMath.sub(_incomingEthereum, totalFee);
        uint256 _amountOfTokens = ethereumToTokens_(_taxedEthereum);

        require(
            _amountOfTokens > 0 &&
                (SafeMath.add(_amountOfTokens, totalSupply()) > totalSupply())
        );

        // is the user referred by a karmalink?
        if (
            // is this a referred purchase?
            (_referredBy != 0x0000000000000000000000000000000000000000 &&
                _referredBy != _customerAddress &&
                balanceOf(_referredBy) > 0) ||
            // no cheating!
            _referredBy == owner
        ) {
            // wealth redistribution
            _referredBy.transfer(refBonus);
        }

        // update  the ledger address for the customer
        _mint(_customerAddress, _amountOfTokens);
        owner.transfer(adminFee);
        // fire event
        emit onTokenPurchase(
            _customerAddress,
            _incomingEthereum,
            _amountOfTokens,
            _referredBy
        );

        return _amountOfTokens;
    }

    /**
     * Calculate Token price based on an amount of incoming ethereum
     * It's an algorithm, hopefully we gave you the whitepaper with it in scientific notation;
     * Some conversions occurred to prevent decimal errors or underflows / overflows in solidity code.
     */
    function ethereumToTokens_(uint256 _ethereum)
        internal
        view
        returns (uint256)
    {
        uint256 _tokenPriceInitial = tokenPriceInitial_ * 1e18;
        uint256 _tokensReceived =
            ((
                // underflow attempts BTFO
                SafeMath.sub(
                    (
                        sqrt(
                            (_tokenPriceInitial**2) +
                                (2 *
                                    (tokenPriceIncremental_ * 1e18) *
                                    (_ethereum * 1e18)) +
                                (((tokenPriceIncremental_)**2) *
                                    (totalSupply()**2)) +
                                (2 *
                                    (tokenPriceIncremental_) *
                                    _tokenPriceInitial *
                                    totalSupply())
                        )
                    ),
                    _tokenPriceInitial
                )
            ) / (tokenPriceIncremental_)) - (totalSupply());

        return _tokensReceived;
    }

    /**
     * Calculate token sell value.
     */
    function tokensToEthereum_(uint256 _tokens)
        internal
        view
        returns (uint256)
    {
        uint256 tokens_ = (_tokens + 1e18);
        uint256 _tokenSupply = (totalSupply() + 1e18);
        uint256 _etherReceived =
            (// underflow attempts BTFO
            SafeMath.sub(
                (((tokenPriceInitial_ +
                    (tokenPriceIncremental_ * (_tokenSupply / 1e18))) -
                    tokenPriceIncremental_) * (tokens_ - 1e18)),
                (tokenPriceIncremental_ * ((tokens_**2 - tokens_) / 1e18)) / 2
            ) / 1e18);
        return _etherReceived;
    }

    function sqrt(uint256 x) internal pure returns (uint256 y) {
        uint256 z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
    }
}

/**
 * @title SafeMath
 * @dev Math operations with safety checks that throw on error
 */
