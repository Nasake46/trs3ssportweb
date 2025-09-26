import React, { useMemo, useState } from 'react';
import styles from './style.module.css';

const ACTIVITES = [
  { id: 'interieur', label: 'Intérieur' },
  { id: 'exterieur', label: 'Extérieur' },
  { id: 'hybride', label: 'Hybride' },
  { id: 'corporate', label: 'Corporate' },
  { id: 'business', label: 'Business' },
];

export default function ContactPage() {
  const [type, setType] = useState('physique'); // 'physique' | 'morale'
  const [form, setForm] = useState({
    // personne physique
    nom: '',
    prenom: '',
    email: '',
    tel: '',
    // personne morale
    societe: '',
    titre: '',
    nomResp: '',
    prenomResp: '',
    emailResp: '',
    telResp: '',
    adresse: '',
    creneau: '',
    activites: [],
    personnes: '',
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const toggleActivite = (id) => {
    setForm((f) => {
      const set = new Set(f.activites);
      if (set.has(id)) set.delete(id);
      else set.add(id);
      return { ...f, activites: Array.from(set) };
    });
  };

  const canSubmit = useMemo(() => {
    if (type === 'physique') {
      return form.nom && form.prenom && form.email && form.tel;
    }
    return (
      form.societe &&
      form.titre &&
      form.nomResp &&
      form.prenomResp &&
      form.emailResp &&
      form.telResp &&
      form.adresse &&
      form.creneau &&
      form.activites.length > 0 &&
      form.personnes
    );
  }, [type, form]);

  const onSubmit = (e) => {
    e.preventDefault();
    // Pour l’instant : simple log. (Tu brancheras Firebase/Backend plus tard)
    console.log('Contact payload', { type, form });
    alert('Merci ! Votre demande a été envoyée (mock).');
  };

  return (
    <main className={styles.page}>
      {/* Bandeau style maquette */}
      <section className={styles.heroCard}>
        <div className={styles.heroRight}>
          <h2>Notre Expertise</h2>
        </div>
      </section>

      {/* Sélecteur de type de contact */}
      <div className={styles.switchRow} role="tablist" aria-label="Type de contact">
        <button
          role="tab"
          aria-selected={type === 'physique'}
          className={`${styles.switchBtn} ${type === 'physique' ? styles.switchActive : ''}`}
          onClick={() => setType('physique')}
        >
          Personne physique
        </button>
        <button
          role="tab"
          aria-selected={type === 'morale'}
          className={`${styles.switchBtn} ${type === 'morale' ? styles.switchActive : ''}`}
          onClick={() => setType('morale')}
        >
          Personne morale (Société)
        </button>
      </div>

      {/* Formulaire */}
      <form className={styles.form} onSubmit={onSubmit}>
        {type === 'physique' ? (
          <>
            <Field label="Nom" required>
              <input
                name="nom"
                value={form.nom}
                onChange={onChange}
                placeholder="Dupont"
                required
              />
            </Field>
            <Field label="Prénom" required>
              <input
                name="prenom"
                value={form.prenom}
                onChange={onChange}
                placeholder="Marie"
                required
              />
            </Field>
            <Field label="Email" required>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                placeholder="marie.dupont@email.com"
                required
              />
            </Field>
            <Field label="Téléphone" required>
              <input
                name="tel"
                value={form.tel}
                onChange={onChange}
                placeholder="06 12 34 56 78"
                pattern="^[0-9+\s().-]{6,}$"
                required
              />
            </Field>
          </>
        ) : (
          <>
            <Field label="Nom de la société" required>
              <input
                name="societe"
                value={form.societe}
                onChange={onChange}
                placeholder="Tr3ssport"
                required
              />
            </Field>
            <Field label="Titre du responsable" required>
              <input
                name="titre"
                value={form.titre}
                onChange={onChange}
                placeholder="DRH, Office Manager, etc."
                required
              />
            </Field>
            <div className={styles.grid2}>
              <Field label="Nom du responsable" required>
                <input
                  name="nomResp"
                  value={form.nomResp}
                  onChange={onChange}
                  placeholder="Durand"
                  required
                />
              </Field>
              <Field label="Prénom du responsable" required>
                <input
                  name="prenomResp"
                  value={form.prenomResp}
                  onChange={onChange}
                  placeholder="Paul"
                  required
                />
              </Field>
            </div>
            <div className={styles.grid2}>
              <Field label="Email du responsable" required>
                <input
                  type="email"
                  name="emailResp"
                  value={form.emailResp}
                  onChange={onChange}
                  placeholder="paul.durand@entreprise.com"
                  required
                />
              </Field>
              <Field label="Téléphone du responsable" required>
                <input
                  name="telResp"
                  value={form.telResp}
                  onChange={onChange}
                  placeholder="01 23 45 67 89"
                  pattern="^[0-9+\s().-]{6,}$"
                  required
                />
              </Field>
            </div>
            <Field label="Adresse" required>
              <textarea
                name="adresse"
                value={form.adresse}
                onChange={onChange}
                placeholder="12 rue Exemple, 75000 Paris"
                rows={3}
                required
              />
            </Field>
            <div className={styles.grid2}>
              <Field label="Créneau pour vous recontacter" required>
                <select
                  name="creneau"
                  value={form.creneau}
                  onChange={onChange}
                  required
                >
                  <option value="">Sélectionnez…</option>
                  <option value="matin">Matin</option>
                  <option value="apres-midi">Après-midi</option>
                  <option value="soir">Soir</option>
                </select>
              </Field>
              <Field label="Pour combien de personnes ?" required>
                <input
                  type="number"
                  min="1"
                  step="1"
                  name="personnes"
                  value={form.personnes}
                  onChange={onChange}
                  placeholder="20"
                  required
                />
              </Field>
            </div>
            <Field label="Type d’activité (plusieurs choix possibles)" required>
              <div className={styles.chips}>
                {ACTIVITES.map((opt) => {
                  const active = form.activites.includes(opt.id);
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      className={`${styles.chip} ${active ? styles.chipActive : ''}`}
                      onClick={() => toggleActivite(opt.id)}
                      aria-pressed={active}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </Field>
          </>
        )}

        <div className={styles.actions}>
          <button type="submit" className={styles.submit} disabled={!canSubmit}>
            Envoyer la demande
          </button>
          <p className={styles.helper}>
            Nous vous répondrons sous 24–48h ouvrées.
          </p>
        </div>
      </form>
    </main>
  );
}

/* ----------------- Petits sous-composants ----------------- */

function Field({ label, required, children }) {
  return (
    <label className={styles.field}>
      <span className={styles.fieldLabel}>
        {label} {required && <sup className={styles.req}>*</sup>}
      </span>
      {children}
    </label>
  );
}
