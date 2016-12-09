package fr.cpe.ejb.impl;

import fr.cpe.models.User;

import javax.annotation.Resource;
import javax.ejb.Local;
import javax.inject.Inject;
import java.util.Queue;
import java.util.logging.Logger;
import javax.jms.Destination;
import javax.jms.JMSContext;
import javax.jms.JMSException;
import javax.jms.ObjectMessage;

/**
 * Created by djbranbran on 09/12/2016.
 */
@Local
public class MessageSenderLocal {

    private static Logger logger = Logger.getLogger(MessageReceiverLocal.class.getName());

    @Inject
    JMSContext context;

    @Resource(mappedName = "java:/jms/queue/watcherqueue")
    Queue queue;


    public void sendMessage(String message) {
        context.createProducer().send((Destination) queue, message);
    }


    public void sendMessage(User user) {
        try {
            ObjectMessage message = context.createObjectMessage();
            message.setObject(user);
            context.createProducer().send((Destination) queue, user);
        } catch (JMSException e) {
            e.printStackTrace();
        }
    }

}
