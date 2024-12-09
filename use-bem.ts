import { kebabCase } from 'lodash-es'

/**
 * Generates BEM (Block-Element-Modifier) class names
 *
 * @param {string} element - The element part of the BEM block (e.g., 'button')
 * @param {modifiers} modifiers - Modifiers to apply to the block or element
 * @returns {[string, string[] ]} - An Array with the base class and modifier classes
 */
type modifiers = string[] | string | object

export default function useBem(block: string) {
  const baseBlock = kebabCase(block)

  return (element: string, modifiers: modifiers = []) => {
    // Create the base class name
    const baseClass = element ? `${baseBlock}__${kebabCase(element)}` : baseBlock

    const modifierValues: string[] = []

    const setModifiers = (modifiers: modifiers) => {
      if (Array.isArray(modifiers)) {
        // Handle array of modifiers
        for (const m of modifiers.filter(Boolean)) {
          setModifiers(m)
        }
      } else if (typeof modifiers === 'string') {
        // Handle single string modifier
        modifierValues.push(`${baseClass}--${kebabCase(modifiers)}`)
      } else if (typeof modifiers === 'object') {
        // Handle object where keys are modifiers and values are truthy booleans
        modifierValues.push(
          ...Object.entries(modifiers)
            .filter(([_, value]) => value)
            .map(([modifier]) => `${baseClass}--${kebabCase(modifier)}`),
        )
      }
    }

    // Start processing
    setModifiers(modifiers)

    return [baseClass, modifierValues]
  }
}
