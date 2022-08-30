// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;



contract Calculator {

    function add(int a, int b) public pure returns(int x) {
        int c = a + b;
        return c;
    }

    function sub(int a, int b) public pure returns(int x) {
        int c = a - b;
        return c;
    }

    function mul(int a, int b) public pure returns(int x) {
        int c = a * b;
        return c;
    }

    function div(int a, int b) public pure returns(int x) {
        require(b > 0, "The second parameter should be larger than 0");

        int c = a / b;
        return c;
    }
}