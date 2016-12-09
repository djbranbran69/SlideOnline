package fr.cpe.dao.impl;

import fr.cpe.dao.IGenericDAO;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.List;

/**
 * Created by djbranbran on 08/12/2016.
 */
public abstract class GenericDAO<T> implements IGenericDAO<T> {

    @PersistenceContext
    private EntityManager em;

    public EntityManager em() {
        return em;
    }

    public void create(final T entity) {
        em.persist(entity);
    }

    public void update(final T entity) {
        em.merge(entity);
    }

    protected T get(final Class<T> type, final String id) {
        return em.find(type, id);
    }

    protected List<T> getAll(final Class<T> type, final String id) {
        CriteriaBuilder builder = em.getCriteriaBuilder();

        CriteriaQuery<T> crit = builder.createQuery(type);
        Root<T> root = crit.from(type);
        crit.select(root);
        return em.createQuery(crit).getResultList();
    }

    public void delete(final T entity) {
        em.remove(entity);
    }
}
