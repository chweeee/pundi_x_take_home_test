const { BN, expectRevert, time } = require('@openzeppelin/test-helpers');

const { assert } = require("chai");

const MyTokenTimelock = artifacts.require('MyTokenTimelock');
const MyToken = artifacts.require('MyToken');
const Executor = artifacts.require('Executor');

contract('Executor', function ([alice, bob, carol]) {
  const initialSupply = '100'

  beforeEach(async function() {
    this.token = await MyToken.new({ from: alice });
    this.releaseTime = (await time.latest()).add(time.duration.years(1));
    this.timelock = await MyTokenTimelock.new(this.token.address, alice, this.releaseTime, { from: alice });
    this.executor = await Executor.new(this.timelock.address, this.token.address, { from: bob });
  });

  it('Test mint and burn token via executor', async function () {
    await this.executor.mintToken(100, { from: bob });
    assert.equal((await this.token.balanceOf(this.executor.address)).toString(), '100');
    await this.executor.burnToken(50, { from: bob });
    assert.equal((await this.token.balanceOf(this.executor.address)).toString(), '50');
  });

  it('Test cannot be released before time limit', async function () {
    await expectRevert(this.timelock.release(), 'TokenTimelock: current time is before release time');
  });

  // bob sends alice 69 tokens, to be released to alice after 1 year
  it('Test can be released after time limit', async function () {
    await this.executor.mintToken(100, { from: bob });
    await this.executor.lockToken(69, { from: bob });
    assert.equal((await this.token.balanceOf(this.executor.address)).toString(), '31');
    await time.increaseTo(this.releaseTime.add(time.duration.years(1)));
    await this.timelock.release();
    assert.equal((await this.token.balanceOf(alice)).toString(), '69');
  });
});
