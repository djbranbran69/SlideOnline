package fr.cpe.rest.impl;

import fr.cpe.ejb.IMessageReceiver;
import fr.cpe.ejb.IMessageSender;
import fr.cpe.models.User;
import fr.cpe.rest.IConnect;
import fr.cpe.services.IUserService;

import javax.inject.Inject;

/**
 * Created by djbranbran on 08/12/2016.
 */
public class Connect implements IConnect {

    @Inject
    IUserService userService;

    @Inject
    IMessageSender messageSender;

    @Inject
    IMessageReceiver messageReceiver;

    @Override
    public User connection(User user) {
        messageSender.sendUser(user);
        return messageReceiver.receiveMessage();
    }
}
