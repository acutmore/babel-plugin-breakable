let template = require('babel-template');

const wrapIfFunction = template("( !!(I && I.constructor && I.call && I.apply) ? function(){I.call(this,arguments);} : I)");

module.exports = function ({types: t}) {
  return {
    visitor: {
      Identifier(path) {
        // Are we passing a variable to a function call
        if (path.parentKey !== 'arguments'){
          return;
        }
        let I = path.node.name;
        if (I === 'arguments'){
          return; 
        }

        let ast = wrapIfFunction({I: t.identifier(I)});
        path.replaceWith(ast);
        path.stop(); // Avoid infinite loop - possibly a better way?
      }
    }
  };
};