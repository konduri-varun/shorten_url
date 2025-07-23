
function App() {
  const [longUrl, setLongUrl] = React.useState("");
  const [validity, setValidity] = React.useState(30);
  const [shortUrl, setShortUrl] = React.useState("");
  const [error, setError] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShortUrl("");
    try {
      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ longUrl, validity: Number(validity) })
      });
      const data = await res.json();
      if (res.ok) {
        setShortUrl(data.shortUrl);
      } else {
        setError(data.error || "Unknown error");
      }
    } catch (err) {
      setError("Could not connect to backend");
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Segoe UI, sans-serif' }}>
      <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', padding: 32, maxWidth: 400, width: '100%' }}>
        <h2 style={{ textAlign: 'center', color: '#2b5876', marginBottom: 24 }}>URL Shortener</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter long URL"
            value={longUrl}
            onChange={e => setLongUrl(e.target.value)}
            style={{ width: "100%", marginBottom: 12, padding: 10, borderRadius: 8, border: '1px solid #b2bec3', fontSize: 16 }}
            required
          />
          <input
            type="number"
            min="1"
            max="1440"
            placeholder="Validity (minutes)"
            value={validity}
            onChange={e => setValidity(e.target.value)}
            style={{ width: "100%", marginBottom: 12, padding: 10, borderRadius: 8, border: '1px solid #b2bec3', fontSize: 16 }}
          />
          <button type="submit" style={{ width: "100%", padding: 12, borderRadius: 8, background: 'linear-gradient(90deg, #2b5876 0%, #4e4376 100%)', color: '#fff', fontWeight: 'bold', fontSize: 16, border: 'none', boxShadow: '0 2px 8px rgba(44,62,80,0.08)', cursor: 'pointer', marginTop: 8 }}>Shorten</button>
        </form>
        {shortUrl && (
          <div style={{ marginTop: 24, padding: 16, background: '#e0eafc', borderRadius: 8, textAlign: 'center', boxShadow: '0 2px 8px rgba(44,62,80,0.04)' }}>
            <strong style={{ color: '#2b5876' }}>Short URL:</strong><br />
            <a href={shortUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#4e4376', wordBreak: 'break-all', fontSize: 16 }}>{shortUrl}</a>
          </div>
        )}
        {error && (
          <div style={{ color: "#d63031", marginTop: 24, textAlign: 'center', fontWeight: 'bold' }}>{error}</div>
        )}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
