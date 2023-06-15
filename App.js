import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function App() {
  const [input, setInput] = useState("");
  const [todo, setTodo] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddTodo = () => {
    if (input.trim() !== "") {
      if (editingIndex !== null) {
        // If an item is being edited, update it
        const updatedTodo = [...todo];
        updatedTodo[editingIndex] = input;
        setTodo(updatedTodo);
        setEditingIndex(null);
      } else {
        // If not editing, add a new item
        setTodo([...todo, input]);
      }
      setInput("");
    }
  };

  const handleEditTodo = (index) => {
    setInput(todo[index]);
    setEditingIndex(index);
  };

  const handleDeleteTodo = (index) => {
    const updatedTodo = [...todo];
    updatedTodo.splice(index, 1);
    setTodo(updatedTodo);
    if (editingIndex === index) {
      // If the currently edited item is deleted, clear the input and editing index
      setInput("");
      setEditingIndex(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>ToDo App</Text>
      <TextInput
        placeholder="Enter the Task"
        style={styles.textInput}
        onChangeText={(text) => setInput(text)}
        value={input}
      />
      <View style={{ margin: 10 }}>
        <Button
          title={editingIndex !== null ? "Save" : "Add Todo"}
          onPress={handleAddTodo}
        />
      </View>
      <FlatList
        data={todo}
        renderItem={({ item, index }) => (
          <View style={styles.list}>
            <Text style={styles.listItem}>{item}</Text>
            <View style={styles.buttonContainer}>
              <View style={{ marginRight: 5 }}>
                <Button title="Edit" onPress={() => handleEditTodo(index)} />
              </View>
              <Button
                title="Delete"
                color={"red"}
                onPress={() => handleDeleteTodo(index)}
              />
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    textAlign: "center",
  },
  heading: {
    fontSize: 20,
    color: "red",
    textAlign: "center",
  },
  textInput: {
    fontSize: 20,
    borderColor: "red",
    borderWidth: 2,
    padding: 4,
    margin: 5,
  },
  list: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  listItem: {
    flex: 1,
    fontSize: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    margin: 10,
  },
});
