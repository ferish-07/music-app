import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import ButtonComponent from './components/ButtonComponent'

export default function Calculator() {
    const [firstNumber,setFirstNumber]= useState("")
    const [result,setResult]=useState(null)
    const [secondNumber, setSecondNumber] = useState("");
  const [operation, setOperation] = useState("");
    const handleNumberPress = (buttonValue) => {
        if (firstNumber.length < 10) {
          setFirstNumber(firstNumber + buttonValue);
        }
      };

      const clear=()=>{
        setFirstNumber("")
        setOperation("")
        setSecondNumber("")
        setResult(null);
      }
      const handleOperationPress = (buttonValue) => {
        setOperation(buttonValue);
        setSecondNumber(firstNumber);
        setFirstNumber("");
      };
      const firstNumberDisplay = () => {
        console.log("Feroshjafnhjabfjbas",firstNumber)
        if (result !== null) {
            console.log("Ferish")
            return (<Text style={result < 99999 ?[ {color: "black", fontSize:32}] : [ {fontSize: 32, color:"red"}]}>{result?.toString()}</Text>) 
        }
        if (firstNumber && firstNumber.length < 6) {
          return (<Text style={{color:"black", fontSize:32}}>{firstNumber}</Text>)
        }
        if (firstNumber === "") {


            console.log("FERhjsrbgkjsbgbsrg HERE")
          return (
        //   <View style={{backgroundColor:'red', flex:1}}>

              <Text style={{color:"black", fontSize:32}}>0</Text>
        //   </View>
          )
        }
        if (firstNumber.length > 5 && firstNumber.length < 8) {
          return (
            <Text style={[{color:"black", fontSize:32}]}>
              {firstNumber}
            </Text>
          );
        }
        if (firstNumber.length > 7) {
          return (
            <Text style={[{color:"black", fontSize:32}]}>
              {firstNumber}
            </Text>
          );
        }
      };
      const getResult = () => {
        switch (operation) {
          case "+":
              clear();
              setResult(parseInt(secondNumber) + parseInt(firstNumber));
              break;
          case "-":
              clear();
              setResult(parseInt(secondNumber) - parseInt(firstNumber));
              break;
          case "*":
              clear();
              setResult(parseInt(secondNumber) * parseInt(firstNumber));
              break;
          case "/":
              clear();
              setResult(parseInt(secondNumber) / parseInt(firstNumber));
              break;
          default:
              clear();
              setResult(0);
              break;
          }
      };
  return (
    <View style={{ flex:1}}>
      <View style={{flex:1, justifyContent:"flex-end", alignItems:'flex-end', margin:20,}}>
        <Text>

      {secondNumber}
        </Text>
          <Text style={{ color: "purple", fontSize: 50, fontWeight: '500' }}>{operation}</Text>
        {firstNumberDisplay()}
     
      </View>
      <View >
        <View style={{flexDirection:'row', justifyContent:'space-around'}}>  

        <ButtonComponent title="C" isGray={true} onPress={()=>clear()}/>
        <ButtonComponent title="+/-" isGray={true}/>

        <ButtonComponent title="%" isGray={true}/>
        <ButtonComponent title="÷" isBlue={true}/>

        </View>
        <View style={{flexDirection:'row', justifyContent:'space-around'}}>
        <ButtonComponent title="7" onPress={() => handleNumberPress("7")} />
        <ButtonComponent title="8" onPress={() => handleNumberPress("8")} />
        <ButtonComponent title="9" onPress={() => handleNumberPress("9")} />
        <ButtonComponent title="×" isBlue onPress={() => handleOperationPress("*")} />
      </View>
     
      <View style={{flexDirection:'row', justifyContent:'space-around'}}>
        <ButtonComponent title="4" onPress={() => handleNumberPress("4")} />
        <ButtonComponent title="5" onPress={() => handleNumberPress("5")} />
        <ButtonComponent title="6" onPress={() => handleNumberPress("6")} />
        <ButtonComponent title="-" isBlue onPress={() => handleOperationPress("-")} />
      </View>
      <View style={{flexDirection:'row', justifyContent:'space-around'}}>
        <ButtonComponent title="1" onPress={() => handleNumberPress("1")} />
        <ButtonComponent title="2" onPress={() => handleNumberPress("2")} />
        <ButtonComponent title="3" onPress={() => handleNumberPress("3")} />
        <ButtonComponent title="+" isBlue onPress={() => handleOperationPress("+")} />
      </View>
      <View style={{flexDirection:'row', justifyContent:'space-around'}}>
        <ButtonComponent title="." onPress={() => handleNumberPress(".")} />
        <ButtonComponent title="0" onPress={() => handleNumberPress("0")} />
        <ButtonComponent title="⌫" onPress={() => setFirstNumber(firstNumber.slice(0, -1))} />
        <ButtonComponent title="=" isBlue onPress={() => getResult()} />
      </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    screenFirstNumber: {
        fontSize: 32,
        color: "black",
        fontWeight: '200',
        // : "flex-end",
    },
})