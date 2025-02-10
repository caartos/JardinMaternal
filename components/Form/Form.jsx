import React from 'react'
import { Text, View } from 'react-native'
import CustomInput from '../Input/CustomInput'

const Form = ({setData, fieldConfig, userData}) => {

    const handleInputChange = (name, value) => {
        setData((completeUser) => ({
            ...completeUser,
            [name]: value
        }))}

  return (
    <View>
    {fieldConfig.map((field) => (
        <CustomInput
        key={field.fieldName}
        label={field.label}
        fieldName={field.fieldName}
        value={userData[field.fieldName]}
        onChangeText={(value)=>handleInputChange(field.fieldName, value)}
        secureTextEntry={field.secureTextEntry}
        required={field.required}
        />      
    ))}
    </View>
  )
}

export default Form