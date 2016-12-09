package fr.cpe.ejb;

import fr.cpe.models.User;

import javax.ejb.Local;

/**
 * Created by djbranbran on 09/12/2016.
 */
@Local
public interface IMessageSender {

    /**
     * To send login and password to the DAO
     * @param user
     */
    void sendUser(User user);

    /**
     * To send a message
     * @param message
     */
    void sendMessage(String message);
}
