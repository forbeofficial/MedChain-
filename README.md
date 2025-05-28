

---

# **MedChain**

## **Decentralized Healthcare Application**

---

## **Overview**

**MedChain** is a decentralized healthcare platform that ensures **secure**, **interoperable**, and **patient-owned** health records using **blockchain technology**. It leverages **Polygon** for scalability and **zk-SNARKs** for privacy-preserving access control. The system complies with **GDPR** and supports AI-powered interoperability for legacy records.

---

## **Problem Statement**

In medical emergencies, **fragmented EHRs** and paper-based systems can delay critical care by **up to 30 minutes**. Over **15 million U.S. health records were breached in 2023**, underscoring vulnerabilities in centralized systems. Standards like **FHIR** and **HL7** are limited by poor interoperability, and many blockchain solutions fall short of meeting **privacy regulations** such as **GDPR**.

---

## **Solution**

The **Decentralized PHR System** addresses these problems by:

* ✅ **Patient Ownership**: Patients maintain complete control over their health records.
* 🔐 **Data Privacy & Security**: Encrypted record sharing using **zk-SNARKs**.
* 🔄 **Seamless Interoperability**: AI-driven conversion of traditional records to **FHIR** format.
* 🚑 **Emergency Access**: Health records are available in **under 60 seconds** through **NFC-enabled apps**.

---

## **Tech Stack**

| Layer               | Technology Used                               |
| ------------------- | --------------------------------------------- |
| **Blockchain**      | Polygon (Ethereum Layer-2)                    |
| **Privacy Layer**   | zk-SNARKs                                     |
| **AI Integration**  | AI model for FHIR format conversion           |
| **Frontend**        | React.js                                      |
| **Backend**         | Node.js with TypeScript                       |
| **Mobile Access**   | NFC-enabled sharing (React Native or Flutter) |
| **Smart Contracts** | Solidity on Polygon                           |

---

## **System Workflow**

1. **Patient Data Ownership**
   Patient health records are encrypted and stored on-chain with patient-managed access controls.

2. **Secure Data Sharing**
   zk-SNARKs ensure that only authorized entities can decrypt and access sensitive data without exposing it publicly.

3. **AI-Powered Interoperability**
   Converts non-standard records into **FHIR-compliant** formats for seamless communication between different healthcare providers.

4. **Rapid Emergency Access**
   Doctors can access a patient’s records quickly in emergency situations via **NFC tap** from the patient’s mobile app.

---

## **UI & Design**

* 🌐 Web Dashboard for Patients and Providers
* 📱 Mobile App with NFC support
* 🔒 Multi-factor authentication & secure access tokens
* 🎨 Minimalist and responsive design for usability

---

## **Project Setup**

### Frontend (React)

```bash
cd frontend
npm install
npm start
```

### Backend (Node.js + TypeScript)

```bash
cd backend
npm install
npm run dev
```

### Smart Contracts (Solidity)

```bash
cd smart-contracts
npm install
npx hardhat compile
npx hardhat test
```

---

## **Implementation Details**

* **Smart Contracts**: Written in Solidity, deployed on Polygon using Hardhat.
* **Backend API**: Developed in **Node.js with TypeScript**, handles auth, data retrieval, zk-SNARK proof generation, and AI FHIR conversion requests.
* **Frontend UI**: Built with **React.js**; integrates Web3 wallet connection and QR/NFC-based record access.

---

## **References**

Kim HJ, Kim HH, Ku H, et al. *Smart Decentralization of Personal Health Records with Physician Apps and Helper Agents on Blockchain: Platform Design and Implementation Study*.
**JMIR Med Inform.** 2021;9(6)\:e26230.
👉 [Read More](https://pmc.ncbi.nlm.nih.gov/articles/PMC8218219/)

---

## **Contributors**

* Shivnandu K
* Harishankar P.P

📧 Contact: **[forbeofficial@gmail.com](mailto:forbeofficial@gmail.com)**

---

## **UI Snapshots**

![image1](https://github.com/user-attachments/assets/2292ca27-3372-4094-b8f7-c7b02a633395)
![image2](https://github.com/user-attachments/assets/6189e5ae-e9ea-4cda-b6d2-a1b2e987b68f)
![image3](https://github.com/user-attachments/assets/a5d8aa26-96a7-45b9-a47d-5fa56e8c7c2b)
![image4](https://github.com/user-attachments/assets/65666b85-0048-4477-9a94-7b835c98ce08)

---

## **Conclusion**

**MedChain** transforms how healthcare data is managed — **secure**, **private**, **interoperable**, and **accessible** when it matters most. By combining **blockchain**, **AI**, and **privacy-preserving cryptography**, it bridges the gaps in today’s fragmented healthcare ecosystem.

---

Let me know if you want this turned into a formatted `README.md` or documentation site.
