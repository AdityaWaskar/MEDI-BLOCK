const Migrations = artifacts.require("Migrations");
const Hospital = artifacts.require("Hospital");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Hospital);
};
