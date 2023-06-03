import React, { ReactNode } from 'react';
import { View, FlexAlignType } from 'react-native';

interface CustomCardViewProps 
{
    children: ReactNode;
    height: number;
    backgroundColor: string;
    displayChildrenAsRow: boolean;
    childrenAlignment: FlexAlignType;
}

const CustomCardView = ({height, backgroundColor, displayChildrenAsRow: displayChildrenAsRow, childrenAlignment: childrenAlignment, children}: CustomCardViewProps) => {
  return (
    <View style={{ 
      backgroundColor: backgroundColor ? backgroundColor : '#303030',
      borderRadius: 10, 
      marginBottom: 10, 
      height: height}}>
      <View style={{ 
        alignItems: childrenAlignment ? childrenAlignment : 'center', 
        padding: 10, 
        flexDirection: displayChildrenAsRow ? 'row' : 'column' }}>
         {children}
      </View>
    </View>
  );
};

export default CustomCardView;