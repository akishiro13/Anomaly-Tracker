import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';
import Header from '@/components/Header';
import { Terminal as TerminalIcon } from 'lucide-react-native';

interface CommandResponse {
  type: 'success' | 'error' | 'info';
  content: string;
}

export default function TerminalScreen() {
  const colorScheme = useColorScheme();
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<CommandResponse[]>([
    { 
      type: 'info', 
      content: 'Welcome to the SCP Foundation Terminal.\nType "help" for available commands.' 
    }
  ]);

  const handleCommand = () => {
    if (!command.trim()) return;

    const normalizedCommand = command.toLowerCase().trim();
    let response: CommandResponse;

    switch (normalizedCommand) {
      case 'help':
        response = {
          type: 'info',
          content: `Available commands:
- help: Show this help message
- clear: Clear terminal history
- status: Show system status
- list facilities: List all SCP facilities
- list classes: List all object classes
- protocols: Show containment protocols
- about: Show Foundation information`
        };
        break;

      case 'clear':
        setHistory([]);
        setCommand('');
        return;

      case 'status':
        response = {
          type: 'success',
          content: `System Status:
- Database: Online
- Containment Systems: Operational
- Security Level: 4
- Active MTF Units: 12
- Containment Breaches: 0`
        };
        break;

      case 'list facilities':
        response = {
          type: 'info',
          content: `Active Facilities:
- Site-19: Primary containment facility
- Site-06-3: Humanoid research center
- Site-38: Neutralized item storage
- Area-14: Keter containment zone
- Site-81: Reality anchor facility
- Area-32: Deep containment complex
- Site-45: Quantum research center`
        };
        break;

      case 'list classes':
        response = {
          type: 'info',
          content: `Object Classes:
- Safe: Easily contained
- Euclid: Unpredictable
- Keter: Hard to contain
- Thaumiel: Used to contain others
- Neutralized: No longer anomalous
- Explained: Understood anomalies
- Esoteric: Special cases
- Archon: Better uncontained
- Apollyon: World-ending threat
- Ticonderoga: Reality-bending
- Cernunnos: Nature-linked`
        };
        break;

      case 'protocols':
        response = {
          type: 'info',
          content: `Standard Protocols:
1. Containment Procedures
   - Regular inspections
   - Security clearance enforcement
   - Emergency response readiness

2. Research Protocols
   - Safe testing guidelines
   - Data collection standards
   - Cross-testing restrictions

3. Security Protocols
   - Access control
   - Information classification
   - Breach containment procedures

4. Personnel Protocols
   - Clearance levels
   - Training requirements
   - Psychological evaluation`
        };
        break;

      case 'about':
        response = {
          type: 'info',
          content: `SCP Foundation
Secure. Contain. Protect.

The SCP Foundation is responsible for containing and studying anomalous entities, objects, and phenomena. Our mission is to protect humanity while advancing our understanding of the unexplained.

Classification: TOP SECRET
Security Clearance: Level 4
Document Status: ACTIVE`
        };
        break;

      default:
        response = {
          type: 'error',
          content: `Command not recognized: "${command}"\nType "help" for available commands.`
        };
    }

    setHistory(prev => [...prev, { type: 'info', content: `> ${command}` }, response]);
    setCommand('');
  };

  return (
    <View style={[
      styles.container, 
      { backgroundColor: Colors[colorScheme ?? 'light'].background }
    ]}>
      <Header title="Terminal Access" />
      
      <ScrollView 
        style={styles.terminal}
        contentContainerStyle={styles.terminalContent}
      >
        {history.map((entry, index) => (
          <Text
            key={index}
            style={[
              styles.terminalText,
              { 
                color: entry.type === 'error' 
                  ? Colors[colorScheme ?? 'light'].keter
                  : Colors[colorScheme ?? 'light'].text 
              }
            ]}
          >
            {entry.content}
          </Text>
        ))}
      </ScrollView>
      
      <View style={[
        styles.inputContainer,
        { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }
      ]}>
        <Text style={[
          styles.prompt,
          { color: Colors[colorScheme ?? 'light'].text }
        ]}>
          {'>'} 
        </Text>
        <TextInput
          style={[
            styles.input,
            { color: Colors[colorScheme ?? 'light'].text }
          ]}
          value={command}
          onChangeText={setCommand}
          onSubmitEditing={handleCommand}
          placeholder="Enter command..."
          placeholderTextColor={Colors[colorScheme ?? 'light'].tabIconDefault}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity 
          onPress={handleCommand}
          style={[
            styles.executeButton,
            { backgroundColor: Colors[colorScheme ?? 'light'].accent }
          ]}
        >
          <TerminalIcon size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  terminal: {
    flex: 1,
    padding: 16,
  },
  terminalContent: {
    paddingBottom: 16,
  },
  terminalText: {
    fontFamily: 'SpecialElite',
    fontSize: 14,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  prompt: {
    fontFamily: 'SpecialElite',
    fontSize: 18,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontFamily: 'SpecialElite',
    fontSize: 16,
    padding: 8,
  },
  executeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});