import { Card, Form, Input, Select } from 'antd';
import React, { useEffect, useState } from 'react'
import { BsCurrencyExchange } from 'react-icons/bs';

function Convert() {

    const defaultfirstselectvalue="Bitcoin";
    const defaultSecondselectValue="Ether";
    const apiUrl='https://api.coingecko.com/api/v3/exchange_rates';
    const [labeldata,setlabeldata]=useState([]);
    const [inputvalue,setinputvalue]=useState(0);
    const [firstSelect,setFirstSelect]=useState(defaultfirstselectvalue);
    const [secondSelect,setSecondSelect]=useState(defaultSecondselectValue);
    const [result,setresult]=useState("0");

    const names=[{
        label:'jack',
        value:'Jack',
    },{
        label:'lack',
        value:'Lack',
    },{
        label:'nack',
        value:'Nack',
    },{
        label:'mack',
        value:'Mack',
    }

]

useEffect(()=>{
    setdata();
}
,[])

async function setdata(){
    
    const response=await fetch(apiUrl);
    const apidata=await response.json();
    const rate=apidata.rates;
    //to Iterate the object use entries
    // console.log(Object.entries(rate));
    const arraydata=Object.entries(rate);
    // const tempArray=[]
    // arraydata.forEach((item)=>{
    //     const tempval={
    //         label:item[1].name,
    //         value:item[1].name,
    //         rate:item[1].value
    //     }
    //     tempArray.push(tempval)
    // })
    // We can use above or use map
    const tempArray= Object.entries(rate).map((item)=>{
        return{
            label:item[1].name,
            value:item[1].name,
            rate:item[1].value
        }
    })
    setlabeldata(tempArray);

}

    useEffect(()=>{
        if (labeldata.length==0) return;
        //This is bcoz if useEffect runs at time of mounting and labeldata is empty at that time and we are 
        //to find the rate hence to ignore that case
        const firstSelectRate=labeldata.find((item)=>{return item.value==firstSelect}).rate;
        const secondSelectRate=labeldata.find((item)=>{return item.value==secondSelect}).rate;
        const resultValue=(inputvalue*secondSelectRate)/firstSelectRate;
        setresult(resultValue.toFixed(6));
    },[inputvalue,firstSelect,secondSelect])    



  return (
    <div>
        <Card className='card-style' title={<h1><BsCurrencyExchange /> Crypto Converter</h1>}>
            <Form>
                <Form.Item>
                    <Input type="text" onChange={(event)=>{setinputvalue(event.target.value)}} placeholder='Enter the values'/>
                </Form.Item>
                <div className='select-list'>
                    <Select style={{width:"200px"}} onChange={(value)=>{setFirstSelect(value)}} defaultValue={defaultfirstselectvalue}  options={labeldata}></Select>
                    <Select style={{width:"200px"}} onChange={(value)=>{setSecondSelect(value)}} defaultValue={defaultSecondselectValue}  options={labeldata}></Select>
                </div>
                <p>{inputvalue} {firstSelect}= {result} {secondSelect}</p>
            </Form>
        </Card>
    </div>
  )
}

export default Convert;