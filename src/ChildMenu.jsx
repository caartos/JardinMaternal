import React from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import LoggedInHeader from '../components/Headers/LoggedInHeader'
import ChildHeader from '../components/Headers/ChildHeader'

const ChildMenu = (child) => {
child = {...child.route.params.child}
console.log("CHILD MENU",child)

    
  return (
    <SafeAreaView>
        <ScrollView>
            <ChildHeader child={child} />
        </ScrollView>
    </SafeAreaView>  )
}

export default ChildMenu