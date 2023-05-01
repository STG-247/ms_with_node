module.exports = function math(options) {

    this.add('init:math',init);

    this.add('role:math,cmd:sum', function sum(msg, respond) {
      respond(null, { answer: msg.left + msg.right })
    })
  
    this.add('role:math,cmd:product', function product(msg, respond) {
      respond(null, { answer: msg.left * msg.right })
    })
  
    function init(msg, respond){
        console.log(JSON.stringify(msg, null, 4));
        respond();
    }

    this.wrap('role:math', function (msg, respond) {
      msg.left  = Number(msg.left).valueOf()
      msg.right = Number(msg.right).valueOf()
      this.prior(msg, respond);
    })
  
  }