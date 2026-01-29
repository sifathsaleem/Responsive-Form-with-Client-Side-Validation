class User {
  constructor(fname, lname, email, passwd) {
    this.fname = fname;
    this.lname = lname;
    this.email = email;
    this.passwd = passwd;
  }
}

const fname = document.querySelector("#fname");
const lname = document.querySelector("#lname");
const email = document.querySelector("#email");
const passwd = document.querySelector("#passwd");
const form = document.querySelector('.form')

document.querySelector("#user-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const fnameVal = fname.value.trim();
  const lnameVal = lname.value.trim();
  const emailVal = email.value.trim();
  const passwdVal = passwd.value.trim();

  if (validateForm(fnameVal, lnameVal, emailVal, passwdVal)) {
    const user = new User(fnameVal, lnameVal, emailVal, passwdVal);

    console.log(user);

    // form.innerHTML = `
    //   <p style="color: #333; text-align:center;">✅ Form submitted successfully!</p>
    // `


  }
});

function validateForm(fnameVal, lnameVal, emailVal, passwdVal) {
  let isValid = true;
  let firstErrorField = null;

  const fields = [
    { element: fname, value: fnameVal },
    { element: lname, value: lnameVal },
    { element: email, value: emailVal },
    { element: passwd, value: passwdVal },
  ];

  fields.forEach(({ element, value }) => {
    if (!validateField(element, value)) {
      isValid = false;
      if (!firstErrorField) firstErrorField = element;
    }
  });

  if (firstErrorField) firstErrorField.focus();

  return isValid;
}

// // Validate a single field
function validateField(field, value) {
  switch (field) {
    case fname:
      if (value === "") {
        setError(field, "First Name cannot be empty");
        return false;
      }
      break;
    case lname:
      if (value === "") {
        setError(field, "Last Name cannot be empty");
        return false;
      }
      break;
    case email:
      if (value === "") {
        setError(field, "Email cannot be empty");
        return false;
      } else if (!validateEmail(value)) {
        setError(field, "Looks like this not an email");
        return false;
      }
      break;
    case passwd:
      if (value === "") {
        setError(field, "Password cannot be empty");
        return false;

      } else if (value.length < 8) {
        setError(field, "Password must be at least 8 characters");
        return false;
        
      } else if (!isValidPassword(value)) {
        setError(field, "Need: uppercase, lowercase, number");
        return false;
      }
      break;
  }

  setSuccess(field);
  return true;
}

// Set error state
function setError(element, message) {
  const inputGroup = element.closest(".input-group");
  const errorElement = inputGroup.querySelector(".error-field");
  const errorIcon = inputGroup.querySelector(".error-icon");
  const successIcon = inputGroup.querySelector(".success-icon");

  errorElement.innerHTML = message;

  errorIcon.style.display = "block";
  successIcon.style.display = "none";

  element.classList.remove("success");
  element.classList.add("error");
}

// Set success state
function setSuccess(element) {
  const inputGroup = element.closest(".input-group");
  const errorElement = inputGroup.querySelector(".error-field");
  const errorIcon = inputGroup.querySelector(".error-icon");
  const successIcon = inputGroup.querySelector(".success-icon");

  errorElement.innerHTML = "";

  errorIcon.style.display = "none";
  successIcon.style.display = "block";

  element.classList.remove("error");
  element.classList.add("success");
}

// Email validation
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

// Password validation
function isValidPassword(password) {
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  return hasUpper && hasLower && hasNumber;
}

// Blur event listeners reusing validateField
fname.addEventListener("input", () => {
  const fnameVal = fname.value.trim();

  // Validate First Name
  validateField(fname, fnameVal);
});

lname.addEventListener("input", () => {
  const lnameVal = lname.value.trim();

  validateField(lname, lnameVal);
});

email.addEventListener("input", () => {
  const emailVal = email.value.trim();

  // Validate Email
  validateField(email, emailVal);
});

passwd.addEventListener("input", () => {
  const passwdVal = passwd.value.trim();
  // Validate Password
  validateField(passwd, passwdVal);

});

// Input event listeners (reusing validateField)

fname.addEventListener("blur", () => {
  const fnameVal = fname.value.trim();

  // Validate First Name
  validateField(fname, fnameVal);
});

lname.addEventListener("blur", () => {
  const lnameVal = lname.value.trim();

  // Validate Last Name

  validateField(lname, lnameVal);
});

email.addEventListener("blur", () => {
  const emailVal = email.value.trim();

  // Validate Email
  validateField(email, emailVal);
});

passwd.addEventListener("blur", () => {
  const passwdVal = passwd.value.trim();
  // Validate Password
  validateField(passwd, passwdVal);
});
