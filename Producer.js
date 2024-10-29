var amqp = require('amqplib/callback_api');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const SendMessage = () => {
    readline.question('Enter your message: ', message => {
    amqp.connect('amqps://ykwnvjfq:tRMVU2jBc3rjxGr6OmdgUqoTmzGcV-Tf@prawn.rmq.cloudamqp.com/ykwnvjfq', function(error0, connection) {
      if (error0) {
        throw error0;
      }
      connection.createChannel(function(error1, channel) {
        if (error1) {
          throw error1;
        }
        var exchange = 'exchange';
        var msg = message;
        readline.question("Who is your reciepient? ", (reciepient) => {
          channel.assertExchange(exchange, 'direct', {
            durable: false
          });
          channel.publish(exchange, reciepient, Buffer.from(msg));
          console.log(" [x] Sent: %s'", message);
          SendMessage();
        });
      });
    });
    
  });  
}

SendMessage();


