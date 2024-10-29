var amqp = require('amqplib/callback_api');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

amqp.connect('amqps://ykwnvjfq:tRMVU2jBc3rjxGr6OmdgUqoTmzGcV-Tf@prawn.rmq.cloudamqp.com/ykwnvjfq', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var exchange = 'exchange';

    channel.assertExchange(exchange, 'direct', {
      durable: false
    });

    channel.assertQueue('', {
      exclusive: true
      }, function(error2, q) {
        if (error2) {
          throw error2;
        }
      console.log(' [*] Waiting for logs. To exit press CTRL+C');

      readline.question("What is your name?: ", (reciepient) => {
        channel.bindQueue(q.queue, exchange, reciepient);
        channel.consume(q.queue, function(msg) {
          console.log(" [x] %s Recieved Message: '%s'", msg.fields.routingKey,  msg.content.toString());
        }, {
          noAck: true
        });
      })
    });
  });
});