import emailjs from '@emailjs/browser';

export function SendClientInvite(data) {
    const { name, email, phoneNumber } = data;

    const templateParams = {
        from_name: "William Cars Website",
        to_name: name,
        to_email: email,
        to_phoneNumber: phoneNumber,
        message: "We are excited to have you on board. Please click the button below to view your invite.",
        link: `${import.meta.env.VITE_BUTTON_LINK}?name=${name}&email=${email}&phoneNumber=${phoneNumber}`
    };

    emailjs
        .send(import.meta.env.VITE_EMAILJS_SERVICE_ID, import.meta.env.VITE_EMAILJS_INVTEMP_ID, templateParams, import.meta.env.VITE_EMAILJS_KEY)
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
        })
        .catch((err) => {
            console.log('FAILED...', err);
        });
}