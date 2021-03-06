"use strict";

/**
 * set the data for countries in the database
 * @param {object} data - API response for all countries
 * @param {string} apiErrorCode - API error code
 * @returns {boolean} - true if data is added successfully otherwise error message
 */

const { Country } = require("../../models/index");
const insertToDB = require("./insertToDB");
const ref = require("../../../config/ref.json");
const replyBody = require("../../routes/common/replyBody");
const fs = require("fs");


module.exports = async function (data, apiErrorCode) {
       // data =  [data[0] , data[1],data[1],data[1],data[1],data[1]]
       let dataObj = {};
       let arrayObj = {
              languages: [],
              currencies: []
       }
       let response;
       try {
              fs.appendFile(".allCountries.json", "[", error => {
                     if (error) {
                            throw (replyBody.error(`${apiErrorCode}_ERROR`, error.message));
                     }
              })
              let dataLength = data.length;
              data.forEach(async (country, index) => {

                     // prepare the country object
                     for (let key in country) {
                            if (ref.hasOwnProperty(key)) {
                                   dataObj[ref[key].keyDefinition] = country[key];
                                   // array.push(dataObj);
                            }
                     }
                     // set data in json file
                     console.log(index , dataLength-1);
                     if (index !== dataLength - 1) {
                            fs.appendFile(".allCountries.json", JSON.stringify(dataObj) + ",", error => {
                                   if (error) {
                                          throw (replyBody.error(`${apiErrorCode}_ERROR`, error.message));
                                   }
                            })
                     } 
                     else {
                            fs.appendFile(".allCountries.json", JSON.stringify(dataObj) , error => {
                                   if (error) {
                                          throw (replyBody.error(`${apiErrorCode}_ERROR`, error.message));
                                   }
                            })
                     }


                     // set data in database
                     arrayObj = await insertToDB(dataObj, ref, arrayObj, apiErrorCode);
                     // console.log("arrayObj for each  country : ", arrayObj);

                     // console.log("\n");
                     // console.log(dataObj);
                     // console.log("\n");

                     // await Country.create(dataObj);
                     dataObj = {};
              });
              fs.appendFile(".allCountries.json", "]" , error => {
                     if (error) {
                            throw (replyBody.error(`${apiErrorCode}_ERROR`, error.message));
                     }
              })
              response = true
              // response = array;

       } catch (error) {
              response = error.message;
              throw (replyBody.error(`${apiErrorCode}_ERROR`, "Cannot set data for countries"));
       }
       return response;
};