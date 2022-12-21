export function combineArrays(arr1, arr2) {
  let combined = arr1.concat(arr2);
  return [...new Set(combined)];
}

export function limitText(text: string, size: number) {
  if (text.length > size) {
    return text.substr(0, size) + "...";
  }
  return text;
}

export function lastMessageTime(date: Date): string {
  const currentDate = new Date();
  const elapsedTime = currentDate.getTime() - date.getTime();
  let diff = getDaysDifference(currentDate, date);
  let days = Math.floor(diff / 86400000);

  if (days === 0) {
    return `${date.getHours()}:${date.getMinutes()}`;
  } else if (elapsedTime < 5 * 24 * 60 * 60 * 1000) {
    const diasTranscorridos = Math.trunc(elapsedTime / (24 * 60 * 60 * 1000));
    const resto = elapsedTime - diasTranscorridos * 24 * 60 * 60 * 1000;
    const horasTranscorridas = Math.trunc(resto / (60 * 60 * 1000));
    return `${
      diasTranscorridos === 0 ? "" : diasTranscorridos + "dias  e "
    }${horasTranscorridas} horas`;
  } else {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }
}

export function getRelativeTime(date: Date): string {
  const currentDate = new Date();
  const yesterdayDate = new Date(currentDate);
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const oneWeekAgoDate = new Date(currentDate);
  oneWeekAgoDate.setDate(oneWeekAgoDate.getDate() - 7);

  if (currentDate.getDay() === date.getDay()) {
    return `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}`;
  } else if (date.getTime() >= yesterdayDate.getTime()) {
    return "ontem";
  } else if (date.getTime() >= oneWeekAgoDate.getTime()) {
    const weekDay = date.getDay();
    const weekDaysMap = new Map([
      [0, "domingo"],
      [1, "segunda-feira"],
      [2, "terça-feira"],
      [3, "quarta-feira"],
      [4, "quinta-feira"],
      [5, "sexta-feira"],
      [6, "sábado"],
    ]);
    return weekDaysMap.get(weekDay);
  } else {
    return `${String(date.getDate()).padStart(2, "0")}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
  }
}

export function orderByUpdatedAt(data: any[]) {
  return data.sort((a, b) => {
    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
  });
}

export function getDaysDifference(date1: Date, date2: Date) {
  const date1Object = new Date(date1);
  const date2Object = new Date(date2);

  const diffTime = Math.abs(date2Object.getTime() - date1Object.getTime());

  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}
