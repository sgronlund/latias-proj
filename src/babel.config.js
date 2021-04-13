/**
 * @brief This file is necessary for the jest 
 * testing framework to run properly.
 */
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};