/**
 * Address Tests
 *
 * Copyright (c) 2016 Rain Agency.
 * Licensed under the MIT license.
 */

'use strict';

var assert = require('chai').assert
    , address = require('../').address
  ;

describe('address', function () {
  describe('say',function(){
    itIs('1465 E Ruben M Torres Sr. Blvd.', '1465 East Ruben M Torres Sr. Boulevard');
    itIs('1314 Town Center Drive S-102', '1314 Town Center Drive Suite 102');
    itIs('2711 NW Town Center Dr. #1', '2711 Northwest Town Center Drive #1');

    itIs('4211 Waialae Avenue', '4211 Waialae Avenue');
    itIs('2402 Frederica', '2402 Frederica');
    itIs('1631 Edinger Avenue', '1631 Edinger Avenue');
    itIs('400 West Fifth Street', '400 West Fifth Street');
    itIs('3011 Jericho Tpke.', '3011 Jericho Turnpike');
    itIs('779 East Yosemite Ave Ste 100', '779 East Yosemite Avenue Suite 100');
    itIs('1741 E. Geneva St.', '1741 East Geneva Street');
    itIs('6701 N. Milburn Avenue', '6701 North Milburn Avenue');
    itIs('9701 W. Flamingo Road', '9701 West Flamingo Road');
    itIs('6605 S. Semoran Blvd', '6605 South Semoran Boulevard');
    itIs('2736 Chapel Hill Rd', '2736 Chapel Hill Road');
    itIs('244 E Ellendale Ave', '244 East Ellendale Avenue');
    itIs('2807 W. Washington', '2807 West Washington');
    itIs('1025  N Stratford Rd', '1025  North Stratford Road');
    itIs('3390 E. 7th Street', '3390 East 7th Street');
    itIs('8295 E. Monte Vista Road', '8295 East Monte Vista Road');
    itIs('2661 Campus Dr.', '2661 Campus Drive');
    itIs('2045 N Shadeland Ave', '2045 North Shadeland Avenue');
    itIs('1380 W. Cheyenne', '1380 West Cheyenne');
    itIs('5701 Tri-County Parkway', '5701 Tri-County Parkway');
    itIs('3550 Washington Ave Frontage Rd', '3550 Washington Avenue Frontage Road');
    itIs('1506 SW 74th', '1506 Southwest 74th');
    itIs('3301 Northwest Expy', '3301 Northwest Expressway');
    itIs('14330 Lake City Way NE', '14330 Lake City Way Northeast');
    itIs('4739 Medical Drive', '4739 Medical Drive');
    itIs('1015 North Memorial Pkwy', '1015 North Memorial Parkway');
    itIs('1035 Hwy 65 North', '1035 Highway 65 North');
    itIs('6203 Rogers Ave', '6203 Rogers Avenue');
    itIs('8702 Keystone Crossing Blvd', '8702 Keystone Crossing Boulevard');
    itIs('280 East Palmdale Blvd.', '280 East Palmdale Boulevard');
    itIs('8410 Pearl Street', '8410 Pearl Street');
    itIs('11169 I-25 Frontage Road', '11169 Interstate 25 Frontage Road');
    itIs('600 9th Street', '600 9th Street');
    itIs('1081 W. Manning Ave.', '1081 West Manning Avenue');
    itIs('25175 Madison Ave.', '25175 Madison Avenue');
    itIs('1201 E. La Habra Blvd.', '1201 East La Habra Boulevard');
    itIs('1929 W. Artesia Blvd.', '1929 West Artesia Boulevard');
    itIs('3699 Hamner Avenue', '3699 Hamner Avenue');
    itIs('276 West Market Street', '276 West Market Street');
    itIs('1470 Roberts St. South', '1470 Roberts Street South');
    itIs('14903 South Robert Trail', '14903 South Robert Trail');
    itIs('4-831 Kuhio Highway #208', '4-831 Kuhio Highway #208');
    itIs('202 South Main Street', '202 South Main Street');
    itIs('10755 N Freeway', '10755 North Freeway');
    itIs('2024 15th Street', '2024 15th Street');
    itIs('1301 2nd Ave', '1301 2nd Avenue');
    itIs('2300 S Brentwood Blvd.', '2300 South Brentwood Boulevard');
    itIs('84 Campground', '84 Campground');
    itIs('2904 S Church Street', '2904 South Church Street');
    itIs('8602 Hillsborough Ave', '8602 Hillsborough Avenue');
    itIs('40908 US Highway 19 North', '40908 US Highway 19 North');
    itIs('119 Bartram Oaks Walk', '119 Bartram Oaks Walk');
    itIs('3425 Thomasville Road', '3425 Thomasville Road');
    itIs('2810 E 116th Street', '2810 East 116th Street');
    itIs('3809 Dylan Place', '3809 Dylan Place');
    itIs('2871 Dixie Highway', '2871 Dixie Highway');
    itIs('1346 Worcester Road', '1346 Worcester Road');
    itIs('1 North Eutaw Street', '1 North Eutaw Street');
    itIs('2030 Wilkes Barre Township Marketplace', '2030 Wilkes Barre Township Marketplace');
    itIs('5129 Roland Avenue', '5129 Roland Avenue');
    itIs('35065 IH 10 West', '35065 IH 10 West');
    itIs('5118 Fairmont Pkwy', '5118 Fairmont Parkway');
    itIs('409 University', '409 University');
    itIs('2021 North Street', '2021 North Street');
    itIs('361 S California Ave', '361 South California Avenue');
    itIs('1110 King Road', '1110 King Road');
    itIs('1150 El Camino Real', '1150 El Camino Real');
    itIs('23005 Outer Drive', '23005 Outer Drive');
    itIs('5070 28th Street SE', '5070 28th Street Southeast');
    itIs('4421 New Bern Avenue', '4421 New Bern Avenue');
    itIs('120 Laconia Road, Suite 100', '120 Laconia Road, Suite 100');
    itIs('1150 Whitehorse-Mercerville Road', '1150 Whitehorse-Mercerville Road');
    itIs('1770 West Main Street, Suite 1400', '1770 West Main Street, Suite 1400');
    itIs('8070 E Broad Street', '8070 East Broad Street');
    itIs('2505 Liberty St. NE', '2505 Liberty Street Northeast');
    itIs('2021 Cumberland Avenue', '2021 Cumberland Avenue');
    itIs('5238 Highway 153', '5238 Highway 153');
    itIs('1960 East 9400 South', '1960 East 9400 South');
    itIs('4008 West 27th Ave', '4008 West 27th Avenue');
    itIs('1125 Center Drive', '1125 Center Drive');
    itIs('26802 92nd Ave NW', '26802 92nd Avenue Northwest');
    itIs('2816 First Street', '2816 First Street');
    itIs('10234 SE 256th Street', '10234 Southeast 256th Street');
    itIs('11523 Avondale Road', '11523 Avondale Road');
    itIs('870 So. Broadway', '870 South Broadway');
    itIs('12605 Taylorsville Road', '12605 Taylorsville Road');
    itIs('123 Bryant Drive', '123 Bryant Drive');
    itIs('2815 N. 91st Avenue', '2815 North 91st Avenue');
    itIs('405 E. Wetmore Road', '405 East Wetmore Road');
    itIs('953 West Clairemont Avenue', '953 West Clairemont Avenue');
    itIs('2905 Northtowne Lane', '2905 Northtowne Lane');
    itIs('359 Cornelia Street', '359 Cornelia Street');
    itIs('911 Montauk Highway', '911 Montauk Highway');

    function itIs(src, dest) {
      it(src + ' => ' + dest, function () {
        var actual = address.say(src);
        assert.equal(actual, dest);
      });
    }


    it('normalizes objects with the definition hint',function() {
      var addr = {
       streetAddressLine1: '1445 First Avenue',
       streetAddressLine2: null,
       streetAddressLine3: null,
       city: 'New York',
       countrySubdivisionCode: 'NY',
       countryCode: 'US',
       postalCode: '100213002'
      };
      var def = {
        line1: 'streetAddressLine1',
        line2: 'streetAddressLine2',
        line3: 'streetAddressLine3',
      }

      var said = address.say(addr,def);
      assert.equal(said,'1445 First Avenue, New York');
    })


  });

  describe('isDeliverable',function(){
    itIs("24 S Center Street|||Spanish Fork|UT|84660|US",true);
    itIs("24 S Center Street|||Spanish Fork|UT|84660|PR",false);
    itIs("24 S Center Street|||Spanish Fork|UT|84660|us",true);
    itIs("24 S Center Street|||Spanish Fork|UT|84660|uS",true);
    itIs("24 S Center Street||||UT|84660|US",false);
    itIs("||||UT|84660|US",false);
    itIs("13|||SLC|Utah|84660|US",true);
    itIs("13|||SLC|Texas|84660|US",true);

    function itIs(src, expected) {
      it(src + ' => ' + expected, function () {
        var actual = address.isDeliverable(address.fromPipes(src));
        assert.equal(actual, expected);
      });
    }
  });

  describe('fromPipes',function(){
    describe('It expands states',function(){
      itIs("24 S Center Street|||Spanish Fork|UT|84660|US",'Utah');
      itIs("24 S Center Street|||Spanish Fork|IL|84660|us","Illinois");

      function itIs(src, expected) {
        it(src + ' => ' + expected, function () {
          var actual = address.fromPipes(src).state;
          assert.equal(actual, expected);
        });
      }
    });
  })
});
