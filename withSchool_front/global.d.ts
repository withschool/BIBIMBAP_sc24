interface DaumPostcode {
    open: () => void;
  }
  
  interface Daum {
    Postcode: new (options: { oncomplete: (data: any) => void }) => DaumPostcode;
  }
  
  interface Window {
    daum: Daum;
  }
  
  interface IAddr {
    address: string;
    zonecode: string;
  }