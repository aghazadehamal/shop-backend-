import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Register.module.css';

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await fetch('https://shop-backend-le06.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }) // phone çıxarıldı
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Qeydiyyat uğurludur");
        navigate("/");
      } else {
        alert(data.message || "Qeydiyyat zamanı xəta baş verdi");
      }
    } catch (err) {
      console.error('Xəta:', err);
      alert("Serverə qoşulmaq mümkün olmadı");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Qeydiyyat</h2>

      <input
        className={styles.input}
        type="text"
        placeholder="İstifadəçi adı"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        className={styles.input}
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <div className={styles.passwordWrapper}>
        <input
          className={styles.input}
          type={showPassword ? "text" : "password"}
          placeholder="Şifrə"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span
          className={styles.togglePassword}
          onClick={() => setShowPassword(!showPassword)}
          title="Şifrəni göstər/gizlət"
        >
          {showPassword ? "🔒" : "👁️"}
        </span>
      </div>

      <button className={styles.button} onClick={handleSubmit}>
        Qeydiyyatdan keç
      </button>

      <p className={styles.footerText}>
        Artıq hesabınız var? <Link to="/login">Daxil olun</Link>
      </p>
    </div>
  );
};

export default Register;
