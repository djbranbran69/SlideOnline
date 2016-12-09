package fr.cpe.dao.impl;

import fr.cpe.dao.IGenericDAO;
import fr.cpe.dao.IUserDao;
import fr.cpe.models.User;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

/**
 * Created by djbranbran on 08/12/2016.
 */
public abstract class UserDao implements IUserDao {

    @PersistenceContext
    private EntityManager em;

    /**
     * Search the user with login , password
     * @param login
     * @param pwd
     * @return All information of the user
     */
    @Override
    public User searchUser(String login, String pwd) {
        CriteriaBuilder builder = em.getCriteriaBuilder();

        CriteriaQuery<User> crit = builder.createQuery(User.class);
        Root<User> root = crit.from(User.class);
        Predicate andClause = builder.and(builder.equal(root.get("login"), login),
                builder.equal(root.get("password"), pwd));
        crit.select(root).where(andClause);
        return em.createQuery(crit).getResultList() == null ? null :
                em.createQuery(crit).getResultList().get(0);
    }


}
