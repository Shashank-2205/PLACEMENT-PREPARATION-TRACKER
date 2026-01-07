import { useState } from 'react';

export default function Captcha({ onValidate }) {
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [userInput, setUserInput] = useState('');

  function generateCaptcha() {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  const handleRefresh = () => {
    const newCaptcha = generateCaptcha();
    setCaptcha(newCaptcha);
    setUserInput('');
    onValidate(false);
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
    const isValid = e.target.value.toLowerCase() === captcha.toLowerCase();
    onValidate(isValid);
  };

  return (
    <div className="captcha-container">
      <div className="captcha-row">
        <div className="captcha-display">{captcha}</div>
        <button type="button" onClick={handleRefresh}>Refresh</button>
      </div>
      <input
        type="text"
        placeholder="Enter CAPTCHA"
        value={userInput}
        onChange={handleInputChange}
        required
      />
    </div>
  );
}