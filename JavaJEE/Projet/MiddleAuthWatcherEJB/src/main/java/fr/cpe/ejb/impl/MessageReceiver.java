package fr.cpe.ejb.impl;

/**
 * Created by djbranbran on 09/12/2016.
 */

import com.sun.tools.javac.util.Log;
import fr.cpe.ejb.IMessageReceiver;
import fr.cpe.models.User;

import javax.annotation.Resource;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.jms.*;
import java.util.logging.Logger;

@Stateless
@LocalBean
public class MessageReceiver implements IMessageReceiver {

// TODO get jms context

    @Inject // On injecte le contexte JMS
    // On redéfinie la ConnectionFactory du contexte si on n'utilise pas celle par
    // défaut. Il faut aussi la déclarer sur le serveur.
    //@JMSConnectionFactory(value = "java:comp/DefaultJMSConnectionFactory")
    private JMSContext context;

    @Resource(lookup = "jms/Queue")
    private Queue queue;

    private static Logger logger = Logger.getLogger(MessageReceiver.class.getName());

    // TODO associate queue from "java:/jms/queue/watcherqueue"

    public User receiveMessage() {
        try {
            Message message = context.createConsumer(queue).receive(1000);
            logger.info(">>> onMessage() - " + message.toString());
            Thread.sleep(3000);

            if (message instanceof ObjectMessage) {
                ObjectMessage obj = (ObjectMessage)message;
                User user = (User) obj.getObject();
                logger.info("JMS Search User RESULT : "+ user.toString());
                logger.info("<<< onMessage()");
                return user;
            }
        } catch (JMSException | InterruptedException e) {
            e.printStackTrace();
        }

        logger.info("<<< onMessage()");
        return null;

    }

}

/*
            if (var1 instanceof TextMessage) {
                String jsonMsg = ((TextMessage) var1).getText();
                logger.info(jsonMsg);

                JsonReader reader = Json.createReader(new StringReader(jsonMsg));

                JsonObject jsonObject = reader.readObject();
                Double[] values = jsonObject.getJsonArray("data").stream()
                        .map(value -> Double.valueOf(value.toString()))
                        .toArray(Double[]::new);

                logger.info("JMS ADD RESULT : " + userService.add(values));

            } else*/