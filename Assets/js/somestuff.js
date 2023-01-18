
import React, { useState } from 'react';

const MyComponent = () => {
    const [isPhoneChecked, setIsPhoneChecked] = useState(false);
    const [isEmailChecked, setIsEmailChecked] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');

    return (
        <div>
            <label>
                <input type="checkbox" onChange={() => setIsPhoneChecked(!isPhoneChecked)} />
                Phone Number
            </label>
            {isPhoneChecked && (
                <div>
                    <label>
                        <input
                            type="text"
                            placeholder="Enter phone number"
                            value={phoneNumber}
                            onChange={e => setPhoneNumber(e.target.value)}
                        />
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            onChange={() => setPhoneNumber(prevState => prevState)}
                            checked={phoneNumber === ''}
                        />
                        Keep the same number
                    </label>
                </div>
            )}

            <label>
                <input type="checkbox" onChange={() => setIsEmailChecked(!isEmailChecked)} />
                Email
            </label>
            {isEmailChecked && (
                <div>
                    <label>
                        <input
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </label>
                </div>
            )}
        </div>
    );
};

export default MyComponent;
