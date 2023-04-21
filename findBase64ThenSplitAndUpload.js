
import {b64} from './base64Data.js'
import { changeBase64ToFileOrBlob } from './findBaseToFile.js'
let regg=/<img [^="">]*src=['"]data:image([^'"]+)[^>]*>/gi

export function getAllBase64Str(str,reg){
  const ans = [];
  let str0 = str;
  let matched = null;
  while ((matched = reg.exec(str0)) !== null) {
      console.log(matched);
      ans.push(matched[1]);
  }
  console.log(ans)
  return ans;
}

export function replaceBase64WithSpecialChar(base,reg,replaceStr){
  return base.replace(reg,replaceStr)
}

let replacedStr = replaceBase64WithSpecialChar(b64,regg,'{b64}')

let matchedImgBase64;
matchedImgBase64 = getAllBase64Str(b64,regg);
let handleStep1Data = matchedImgBase64.map((item,i)=>{
  let base = "data:image"+item;
  let baseFile = changeBase64ToFileOrBlob(base);
  return new Promise((resolve, reject) => {
    var data = { file: baseFile };
    updata.upfile(data).then(res=>{
      resolve({
        id:i,
        res,
      })
    }).catch(err=>{
      reject()
    });
  });
})

Promise.all([...handleStep1Data]).then((values) => {
  console.log(values);
});


export function matchBase64ThenUpload(base64Img,reg,upApi){


  let replacedStr = replaceBase64WithSpecialChar(b64,regg,'{b64}')
  let matchedImgBase64;
matchedImgBase64 = getAllBase64Str(b64,regg);
let handleStep1Data = matchedImgBase64.map((item,i)=>{
  let base = "data:image"+item;
  let baseFile = changeBase64ToFileOrBlob(base);
  return new Promise((resolve, reject) => {
    var data = { file: baseFile };
    upApi(data).then(res=>{
      resolve({
        id:i,
        res,
      })
    }).catch(err=>{
      reject()
    });
  });
})
  return new Promise((resolve, reject) => {
    Promise.all([...handleStep1Data]).then((values) => {
      console.log(values);
      resolve()
    }).catch(err=>{reject()});
  })

  
}




