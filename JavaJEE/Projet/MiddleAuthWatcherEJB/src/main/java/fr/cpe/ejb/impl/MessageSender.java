package fr.cpe.ejb.impl;

import fr.cpe.ejb.IMessageReceiver;
import fr.cpe.ejb.IMessageSender;
import fr.cpe.models.User;

import javax.annotation.Resource;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.jms.*;

/**
 * Created by djbranbran on 09/12/2016.
 */

@Stateless

@LocalBean
public class MessageSender implements IMessageSender {


    @Inject
    JMSContext context;

    @Resource(mappedName = "java:/jms/watcherAuthJMS")
    Topic topic;

    @Override
    public void sendUser(User user) {
        context.createProducer().send(topic,user);
    }

    public void sendMessage(String message) {
        context.createProducer().send(topic,message);
    }

}
