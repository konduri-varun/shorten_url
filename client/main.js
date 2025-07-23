
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
    <div style={{ maxWidth: 400, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h2>URL Shortener</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter long URL"
          value={longUrl}
          onChange={e => setLongUrl(e.target.value)}
          style={{ width: "100%", marginBottom: 8 }}
          required
        />
        <input
          type="number"
          min="1"
          max="1440"
          placeholder="Validity (minutes)"
          value={validity}
          onChange={e => setValidity(e.target.value)}
          style={{ width: "100%", marginBottom: 8 }}
        />
        <button type="submit" style={{ width: "100%" }}>Shorten</button>
      </form>
      {shortUrl && (
        <div style={{ marginTop: 16 }}>
          <strong>Short URL:</strong> <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
        </div>
      )}
      {error && (
        <div style={{ color: "red", marginTop: 16 }}>{error}</div>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
