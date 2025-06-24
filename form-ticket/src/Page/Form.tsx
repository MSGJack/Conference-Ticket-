import { useForm } from "../Context/formContext";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export function UserFrom() {
  const { userValues, updateValues } = useForm();
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [gitError, setGitError] = useState("");
  const [fileError, setFileError] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const gitRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const validateEmail = () => {
    const emailValue = emailRef.current?.value || "";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue.trim())) {
      setEmailError("Enter a valid email address.");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const validateName = () => {
    const nameValue = nameRef.current?.value || "";

    if (!nameValue) {
      setNameError("Enter your name.");
      return false;
    } else {
      setNameError("");
      return true;
    }
  };

  const validateGit = () => {
    const gitValue = gitRef.current?.value || "";

    if (!gitValue) {
      setGitError("Enter your git username");
      return false;
    }
    if (gitValue[0] !== "@") {
      setGitError("GitHub username should start with '@'.");
      return false;
    }

    setGitError("");
    return true;
  };

  const uploadAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSize = 500 * 1024;
    if (file.size > maxSize) {
      setFileError("File is too large!");
      return false;
    }

    if (userValues.avatar_url) {
      URL.revokeObjectURL(userValues.avatar_url);
    }

    const url = URL.createObjectURL(file);
    updateValues({ avatar_url: url });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailValid = validateEmail();
    const nameValid = validateName();
    const gitValue = validateGit();
    if (!emailValid) return;
    if (!nameValid) return;
    if (!gitValue) return;
    navigate("/ticket");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-sec">
          <label htmlFor="avatar-upload">Upload Avatar</label>
          <label className="avatar-div">
            <img
              src="/icon-upload.svg"
              alt="upload icon"
              className="upload-icon"
            />
            <p>Drag and drop or click to upload</p>
            <input
              type="file"
              accept="image/*"
              id="avatar-upload"
              onChange={uploadAvatar}
              className="browse-display"
            />
          </label>
          <div className="info-sec">
            <img src="/icon-info.svg" className="icon-info" />
            <p className="icon-p">
              Upload your photo (JPEG or PNG, max size: 500KB).
            </p>
          </div>
          {fileError && <p className="formError">{fileError}</p>}
        </div>
        <div className="form-sec">
          <label htmlFor="full-name">Full Name</label>
          <input
            type="text"
            value={userValues.full_name}
            placeholder=""
            onChange={(e) => updateValues({ full_name: e.target.value })}
            required
            id="full-name"
            aria-required="true"
            aria-describedby="fullNameError"
            ref={nameRef}
          />
          {nameError && <p className="formError">{nameError}</p>}
        </div>
        <div className="form-sec">
          <label htmlFor="Email">Email Address</label>
          <input
            type="text"
            value={userValues.email}
            placeholder=" example@email.com"
            onChange={(e) => updateValues({ email: e.target.value })}
            required
            id="Email"
            aria-required="true"
            aria-describedby="EmailError"
            ref={emailRef}
          />
          {emailError && <p className="formError">{emailError}</p>}
        </div>
        <div className="form-sec">
          <label htmlFor="Github-name">Github Username</label>
          <input
            type="text"
            value={userValues.github_name}
            placeholder=" @yourusername"
            onChange={(e) => updateValues({ github_name: e.target.value })}
            required
            id="Github-name"
            aria-required="true"
            aria-describedby="GithubNameError"
            ref={gitRef}
          />
          {gitError && <p className="formError">{gitError}</p>}
        </div>
        <button type="submit"> Generate My Ticket</button>
      </form>
    </>
  );
}
