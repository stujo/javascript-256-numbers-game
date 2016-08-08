beforeEach(function () {
  jasmine.addMatchers({
    toBeAnyOf: function () {
      return {
        compare: function (actual, expected) {

           var result = false;
           for (var i = 0, l = expected.length; i < l; i++) {
               if (actual === expected[i]) {
                   result = true;
                   break;
               }
           }
          return {
            pass: result
          }
        }
      };
    }
  });
});
