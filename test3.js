const crypto = require('crypto');
const Key = require('./model/Key.js');

const publicKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDYj4Wjz4RqrkW69iSyj8TBj+lu
TXUpsb+pIp2mkmJOIIwH+G6QeP93eojSzfIpktUSHUiy9U6TukeQORd20PaClm0m
yqYOblGx/0AuL72qpq3MkrVdxWylKg5fHT4d1tuDodooUqpfaVMwAikSN4TriiR7
3A/gWqY8FDBzKkXqhwIDAQAB
-----END PUBLIC KEY-----
`;

const privateKey = `-----BEGIN PRIVATE KEY-----
MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBANiPhaPPhGquRbr2
JLKPxMGP6W5NdSmxv6kinaaSYk4gjAf4bpB4/3d6iNLN8imS1RIdSLL1TpO6R5A5
F3bQ9oKWbSbKpg5uUbH/QC4vvaqmrcyStV3FbKUqDl8dPh3W24Oh2ihSql9pUzAC
KRI3hOuKJHvcD+BapjwUMHMqReqHAgMBAAECgYEAxLzOOd1CfPBJpOoMuLNnmjk1
ZeG0eOZkKjGqazM9X6Ct1mfZeiKSY2bMekZio2Yjb8tuyjWU5xwp+1oCeQyphJhs
713fZdD2YqpBzMtGfzDfjZJ9NRwOCgPmWEs6BbGWVmOd5D+2X6/iKcHY5g6Le6T9
U+qxCoMAgh17Ox9q/1ECQQD8e3iObczWrLf5XpmUNIngbP0HyohNprCXrS66zbPS
E/FIAQTjLkGDsOjKfxiwHEvVZvzvHQD/kGFh6MdZe10bAkEA25Pt4IT7lPXkNAHV
OE750jh1aRvwYzuLmOwfW/iMtf+8RiMGvZDpv4wRLYWzxZOp7ckTU/Mz46Ibrulo
rRXbBQJAMAKShBLg9plVSnfwoDv1U9Wlr8uVa56cydrGngLrhLECGn0HHuP21UHY
oljUqvhWezfgNN/BBte/jMyky6EnrQJBAJBKQ1T4zkHy24T5d13LOAtWooDxpSPw
aymQcIMFb6HhbZ1BQxqq8Y+3wUoCxEGfaVkiexr9hCmfy0VDiE/FPukCQHUfLnAc
uK9BJrJLvWVy5dnheOi+43nZWI6MYrKhMWPJVYKAvPAtIebgy4CM+TI2nKF9MORm
msJXIKm1Yoz256Y=
-----END PRIVATE KEY-----`;

const k = new Key({
    publicKey: publicKey,
    privateKey: privateKey
});

k.save();

// const text = 'hello world';

// const result = crypto.publicEncrypt(publicKey, Buffer.from(text));

// const result1 = crypto.privateDecrypt(privateKey, result);

// console.log(result1.toString());



