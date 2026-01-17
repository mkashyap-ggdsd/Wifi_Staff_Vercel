import { useState } from 'react';

export default function Home() {
  const [roll, setRoll] = useState('');
  const [reg, setReg] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  async function fetchData() {
    setError('');
    const res = await fetch('/api/fetch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roll, reg })
    });
    const data = await res.json();
    if (!res.ok) setError(data.error);
    else setResult(data);
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>GGDSD College Students WiFi Credentials</h1>
        <input placeholder="Enter Your College ID of 4 Digits" maxLength="4" onChange={e=>setRoll(e.target.value)} style={styles.input}/>
        <input placeholder="Enter First 4 Digits of your Phone No." maxLength="4" onChange={e=>setReg(e.target.value)} style={styles.input}/>
        <button onClick={fetchData} style={styles.button}>Get Credentials</button>

        {error && <p style={styles.error}>{error}</p>}
        {result && (
          <div
                style={{
                    marginTop: '25px',
                    padding: '22px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    boxShadow: '0 18px 45px rgba(0,0,0,0.35)',
                    color: '#fff',
                    textAlign: 'center'
                    }}
              >
        <p style={{ fontSize: '22px', letterSpacing: '2px', marginBottom: '6px' }}>
            USERNAME
            </p>

                <p style={{ fontSize: '28px', fontWeight: '900', marginBottom: '20px' }}>
                {result.username}
  </p>

  <p style={{ fontSize: '22px', letterSpacing: '2px', marginBottom: '6px' }}>
    PASSWORD
  </p>

  <p
    style={{
      fontSize: '24px',
      fontWeight: '900',
      textShadow: '0 4px 12px rgba(0,0,0,0.4)'
    }}
  >
    {result.password}
  </p>
</div>
         
        )}
      </div>
    </div>
  );
}

const styles = {
  container:{minHeight:'100vh',display:'flex',justifyContent:'center',alignItems:'center',
  background:'linear-gradient(135deg,#667eea,#764ba2)'},
  card:{background:'#fff',padding:30,borderRadius:18,width:360,textAlign:'center',boxShadow: '0 15px 40px rgba(0,0,0,0.3)'},
  title:{marginBottom:20,color:'#333'},
  input:{width:'90%',padding:10,marginBottom:10,fontSize:14,border:'1',borderRadius:8},
  button:{width:'100%',padding:12,fontSize:16,background:'#667eea',color:'#fff',border:'1',borderRadius:10},
  result:{marginTop:20,color:'#333'},
  error:{color:'red',marginTop:10}
};
