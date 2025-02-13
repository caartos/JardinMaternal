import React from 'react'
import { View } from 'react-native'
import CustomInput from '../Input/CustomInput'

const Form = ({setData, fieldConfig, userData , style= null}) => {

    const handleInputChange = (name, value) => {
        setData((completeUser) => ({
            ...completeUser,
            [name]: value
        }))}
  
  return (
    <View style={style}>
    {fieldConfig.map((field) => (
        <CustomInput
        key={field.fieldName}
        label={field.label}
        placeholder={field.placeholder}
        value={userData[field.fieldName]}
        onChangeText={(value)=>handleInputChange(field.fieldName, value)}
        secureTextEntry={field.secureTextEntry}
        required={field.required}
        />      
    ))}
    </View>
  )
}

export default Form;