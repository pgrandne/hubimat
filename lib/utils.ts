import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  ApplicationVariable,
  ApplicationValueType,
  ServiceState,
  HealthStatus,
} from "./enums";
import { z } from "zod";
import { ApplicationResponse } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createImage = (fileBytes?: string, format?: string) => {
  const binaryData = atob(
    fileBytes ??
      "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiLz4="
  );
  const uint8Array = Uint8Array.from(binaryData, (c) => c.charCodeAt(0));
  // const mimeType =
  //   {
  //     svg: "image/svg+xml",
  //     jpg: "image/jpeg",
  //     jpeg: "image/jpeg",
  //     png: "image/png",
  //     gif: "image/gif",
  //   }[format] || "image/svg+xml";
  const blob = new Blob([uint8Array], {
    type: format ?? "image/svg+xml",
  });

  const newBlobURL = URL.createObjectURL(blob);
  return newBlobURL;
};

/**
 * Function to convert into camel Case
 * @param str
 * @returns
 */
export function GetCamelCase(str: string) {
  // Using replace method with regEx
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index == 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
}

/**
 * Transform a Date given by the Core Backend to a Date on the application String format
 * @param coreDate
 * @returns
 */
export function CoreDateToString(coreDate: string | Date) {
  if (!coreDate) {
    return "";
  }

  var date = new Date(coreDate);
  if (!coreDate.toString().includes("+"))
    date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

  var dateStr = date.toLocaleDateString("fr-FR", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
    timeZone: "Europe/Paris",
  });
  return dateStr;
}

/**
 * Get the string date time on a format to be used as filename
 * @param date
 * @returns
 */
export function DateToFileString(date: Date) {
  var datetime = new Date(date);

  const hours = datetime.getHours().toString().padStart(2, "0");
  const minutes = datetime.getMinutes().toString().padStart(2, "0");
  const seconds = datetime.getSeconds().toString().padStart(2, "0");
  const day = datetime.getDate().toString().padStart(2, "0");
  const month = (datetime.getMonth() + 1).toString().padStart(2, "0");
  const year = datetime.getFullYear();
  const dateStr = `${year}${month}${day}_${hours}${minutes}${seconds}`;
  return dateStr;
}

/**
 * Async wait during some time in miliseconds
 * @param ms
 * @returns
 */
export async function Sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Get a Zod field type using a Application Value type
 * @param processTypeField
 * @returns
 */
export function GetZodFieldTypeFromApplicationValueType(
  valueType: ApplicationValueType,
  label: string,
  isMandatory: boolean,
  minValue?: number | null,
  maxValue?: number | null,
  defaultValue?: string | null,
  listValues?: string[] | null,
  longDescription?: string
): any {
  const fieldType: ApplicationValueType =
    ApplicationValueType[
      valueType.toString() as keyof typeof ApplicationValueType
    ];
  let zodfieldType: z.ZodSchema | null = null;
  const genericInvalidTypeMessage: string = "Renseignez une valeur valide";
  const genericRequiredMessage: string = "Renseignez une valeur " + label;
  switch (fieldType) {
    case ApplicationValueType.INT:
    case ApplicationValueType.DOUBLE:
    case ApplicationValueType.FLOAT:
    case ApplicationValueType.PORT:
    case ApplicationValueType.TELEPHONE_NUMBER:
    case ApplicationValueType.DEVICE:
    case ApplicationValueType.DEVICE_TYPE:
    case ApplicationValueType.HIERARCHY_ITEM:
    case ApplicationValueType.HIERARCHY_TYPE:
    case ApplicationValueType.PLAN:
    case ApplicationValueType.PLAN_TYPE:
    case ApplicationValueType.INT_PASSWORD:
      var numberType: z.ZodNumber = z.coerce.number({
        description: label,
        invalid_type_error: genericInvalidTypeMessage,
        required_error: genericRequiredMessage,
      });
      if (fieldType == ApplicationValueType.INT) numberType = numberType.int();
      else if (
        fieldType == ApplicationValueType.PORT ||
        fieldType == ApplicationValueType.TELEPHONE_NUMBER
      )
        numberType = numberType.positive();

      if (minValue) {
        numberType = numberType.min(minValue!);
      }

      if (maxValue) {
        numberType = numberType.max(maxValue!);
      }

      zodfieldType = numberType;
      break;
    case ApplicationValueType.STRING:
    case ApplicationValueType.EMAIL:
    case ApplicationValueType.PASSWORD:
    case ApplicationValueType.IP_HOSTAME:
    case ApplicationValueType.DATETIME:
    case ApplicationValueType.COLOR:
    case ApplicationValueType.POSTALADDRESS:
    case ApplicationValueType.FILE:
    case ApplicationValueType.IMAGE:
    case ApplicationValueType.HEX:
      var stringType: z.ZodString = z.string({
        description: label!,
        message: longDescription,
        invalid_type_error: genericInvalidTypeMessage,
        required_error: genericRequiredMessage,
      });
      if (fieldType == ApplicationValueType.EMAIL)
        stringType = stringType.email();
      else if (fieldType == ApplicationValueType.DATETIME)
        stringType = stringType.datetime();
      else if (fieldType == ApplicationValueType.IP_HOSTAME) stringType.ip();

      if (isMandatory) stringType = stringType.min(1);

      zodfieldType = stringType;
      break;
    case ApplicationValueType.BOOLEAN:
      var booleanType: z.ZodBoolean = z.boolean({
        description: label,
        message: longDescription,
      });

      zodfieldType = booleanType.default(
        defaultValue?.toString().toLowerCase() === "true" ||
          defaultValue === "1"
      );
      break;
    case ApplicationValueType.INTERFACE:
    case ApplicationValueType.LIST:
    case ApplicationValueType.FILE_LIST:
      zodfieldType = z.enum(listValues as any).describe(label);
      break;
    case ApplicationValueType.TELEPHONE_NUMBER_LIST:
    case ApplicationValueType.ACTION_CONFIRMATION:
    case ApplicationValueType.NONE:
    default:
      zodfieldType = z.any();
      break;
  }

  if (fieldType !== ApplicationValueType.BOOLEAN)
    zodfieldType = zodfieldType.default(defaultValue);

  if (!isMandatory) zodfieldType = zodfieldType.optional();

  return zodfieldType;
}

/**
 * Get the label used for a Service State
 * @param serviceState
 * @returns
 */
export const GetServerStateLabel = (serviceState: ServiceState | undefined) => {
  if (!serviceState) return "Connection en cours...";

  if (isNaN(+serviceState)) {
    serviceState =
      ServiceState[serviceState.toString() as keyof typeof ServiceState];
  }

  switch (serviceState) {
    case ServiceState.LOGIN_FAILED:
      return "Problème d'authentification";
    case ServiceState.OFFLINE:
      return "Déconnecté";
    case ServiceState.ONLINE:
      return "Connecté";
    case ServiceState.RUNNING:
      return "En execution";
    case ServiceState.SERVICE_UNAVAILABLE:
      return "Service non disponible";
    case ServiceState.STARTING:
      return "En initialisation";
    default:
    case ServiceState.CONNECTING:
      return "Connection en cours...";
  }

  return "";
};

/**
 * Get the label used for a Service State
 * @param serviceHealthState
 * @returns
 */
export const GetServerHealthStateLabel = (
  serviceHealthState: HealthStatus | undefined
) => {
  if (!serviceHealthState) return "Connection en cours...";

  if (isNaN(+serviceHealthState)) {
    serviceHealthState =
      HealthStatus[serviceHealthState.toString() as keyof typeof HealthStatus];
  }

  switch (serviceHealthState) {
    case HealthStatus.Healthy:
      return "Connecté";
    case HealthStatus.Unhealthy:
      return "En Erreur";
    case HealthStatus.Degraded:
      return "Dégradé";
    default:
      return "Connection en cours...";
  }

  return "";
};

// Compare 2 objects and return differences
export const getObjectDifferences = (obj1: any, obj2: any) => {
  const differences: any = {};

  // Check for each field of the object 1 that the field is the same in object 2
  for (let key in obj1) {
    if (obj1.hasOwnProperty(key)) {
      const value1 = obj1[key];
      const value2 = obj2[key];

      // Check if the field is an object = recursive comparaison
      if (
        typeof value1 === "object" &&
        value1 !== null &&
        typeof value2 === "object" &&
        value2 !== null
      ) {
        const nestedDifferences = getObjectDifferences(value1, value2);
        if (Object.keys(nestedDifferences).length > 0) {
          // Add the difference
          differences[key] = nestedDifferences;
        }
      } else if (
        value1 !== value2 &&
        !(value1 === false && value2 === undefined)
      ) {
        switch (key) {
          case "hierarchyTypeName":
            break;
          case "hierarchyParentName":
            break;
          case "navigation":
            break;
          case "planFileId":
            break;
          case "info":
            break;
          default:
            differences[key] = { from: value1, to: value2 };
        }
      }
    }
  }

  return differences;
};
/**
 * Delete the accents on a string and retur the normalized string
 * @param inStr
 * @returns
 */
export function accentDelete(inStr: string): string {
  return inStr.replace(
    /([àáâãäå])|([çčć])|([èéêë])|([ìíîï])|([ñ])|([òóôõöø])|([ß])|([ùúûü])|([ÿ])|([æ])/g,
    function (str, a, c, e, i, n, o, s, u, y, ae) {
      if (a) return "a";
      if (c) return "c";
      if (e) return "e";
      if (i) return "i";
      if (n) return "n";
      if (o) return "o";
      if (s) return "s";
      if (u) return "u";
      if (y) return "y";
      if (ae) return "ae";
      return str;
    }
  );
}

/**
 * Update the toast using the server response
 * @param toast
 * @param response
 */
export function UpdateToastByResponse(
  toast: any,
  toastId: string | number,
  response: ApplicationResponse
) {
  if (response.success) {
    toast.success(
      `Action réalisée correctement${
        response.message && " : " + response.message
      }`,
      {
        id: toastId,
      }
    );
  } else {
    toast.error(
      `Action NON réalisée. ${response.status}(${response.code}): ${response.message}`,
      { id: toastId }
    );
  }
}

/**
 * Update a Tast using the error
 * @param toast
 * @param toastId
 * @param error
 */
export function UpdateToastByError(
  toast: any,
  toastId: string | number,
  error: any
) {
  toast.error(`Action NON réalisée. ${error.message}`, { id: toastId });
}

export function sanitizeFileName(filename: string): string {
  // Define invalid characters for Windows file names
  const invalidChars = /[<>:"\/\\|?*]/g;
  
  // Remove invalid characters
  let sanitized = filename.replace(invalidChars, "_");

  // Trim spaces from start and end
  sanitized = sanitized.trim();

  // Prevent reserved names (simple safeguard)
  const reservedNames = ["CON", "PRN", "AUX", "NUL", "COM1", "LPT1"];
  if (reservedNames.includes(sanitized.toUpperCase())) {
    sanitized += "_safe";
  }

  return sanitized || "unnamed_file"; // Default if empty
}