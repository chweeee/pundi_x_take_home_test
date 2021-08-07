const { assert } = require("chai");

const MyToken = artifacts.require('MyToken');

contract('MyToken', function ([alice, bob, carol]) {
  const initialSupply = '1000000'

  beforeEach(async function () {
    // alice is the owner of the token
    this.token = await MyToken.new({ from: alice });
    await this.token.mint(alice, initialSupply);
  });

  it('Test correct name and symbol and decimal', async function () {
    assert.equal((await this.token.name()), 'My Token');
    assert.equal((await this.token.symbol()), 'MTKN');
    assert.equal((await this.token.decimals()), '18');
  });

  it('Test minting initial supply and delegation to owner', async function () {
    assert.equal((await this.token.totalSupply()).toString(), initialSupply);
    assert.equal((await this.token.balanceOf(alice)).toString(), initialSupply);
  })

  it('Test mint and burn', async function () {
    const mintAmount = '1000000'
    const burnAmount = '500000'
    await this.token.mint(bob, mintAmount);
    assert.equal((await this.token.totalSupply()).toString(), '2000000');
    assert.equal((await this.token.balanceOf(bob)).toString(), initialSupply);
    await this.token.burn(bob, burnAmount);
    assert.equal((await this.token.totalSupply()).toString(), '1500000');
    assert.equal((await this.token.balanceOf(bob)).toString(), '500000');
  })
});

