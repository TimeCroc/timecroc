// function to ensure phone number is in valid format
function cleanPhoneNumber(phone: string): string | null {
  // Step 1: Remove non-numeric characters
  let cleanedNumber = phone.replace(/\D/g, '');

  let isValidPhoneNumber = true;
  // Step 2: Check the length
  if (cleanedNumber.length < 10 || cleanedNumber.length > 11) {
    isValidPhoneNumber = false;
  }
  // Step 3: Remove an initial '1' from an 11-digit number
  if (cleanedNumber.length === 11 && cleanedNumber[0] === '1') {
    cleanedNumber = cleanedNumber.substring(1);
  }
  // Step 4: Check for an 11-digit number where the first digit is not '1'
  if (cleanedNumber.length === 11 && cleanedNumber[0] !== '1') {
    isValidPhoneNumber = false;
  }
  // Step 5: Don't accept numbers that start with '0'
  if (cleanedNumber[0] === '0' || cleanedNumber[0] === '1') {
    isValidPhoneNumber = false;
  }
  // return the cleaned phone number
  return isValidPhoneNumber ? cleanedNumber : null;
}

export default cleanPhoneNumber;