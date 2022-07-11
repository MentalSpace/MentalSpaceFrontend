import { Divider, View, Text } from 'native-base';

type TextDividerProps = {
  msg: string;
};

function TextDivider({ msg }: TextDividerProps) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Divider mx="2" style={{ flex: 1 }} />
      <Text color="warmGray.500" style={{ textAlign: 'center' }}>
        {msg}
      </Text>
      <Divider mx="2" style={{ flex: 1 }} />
    </View>
  );
}

export default TextDivider;
