package fr.cpe.ejb.impl;


import fr.cpe.models.User;
import fr.cpe.services.IUserService;

import javax.ejb.ActivationConfigProperty;
import javax.ejb.MessageDriven;
import javax.inject.Inject;
import javax.jms.*;
import java.util.logging.Logger;

/**
 * Created by ubuntu on 9/16/16.
 */
@MessageDriven(name = "AdditionMDB", activationConfig = {
        @ActivationConfigProperty(propertyName = "destinationType", propertyValue = "javax.jms.Queue"),
        @ActivationConfigProperty(propertyName = "destination", propertyValue = "asi2-Queue"),
        @ActivationConfigProperty(propertyName = "acknowledgeMode", propertyValue = "Auto-acknowledge") })
public class MessageReceiverLocal implements MessageListener {

    private static final Logger logger = Logger.getLogger(MessageReceiverLocal.class.getName());

    @Inject
    IUserService userService;

    @Override
    public void onMessage(Message message) {

        try {
            logger.info(">>> onMessage() - " + message.toString());
            Thread.sleep(3000);
            if (message instanceof ObjectMessage) {
                ObjectMessage obj = (ObjectMessage)message;
                User user = (User) obj.getObject();
                logger.info("JMS Search User RESULT : " +userService.searchUser(user) );
            }
        } catch (JMSException | InterruptedException e) {
            e.printStackTrace();
        }

        logger.info("<<< onMessage()");

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