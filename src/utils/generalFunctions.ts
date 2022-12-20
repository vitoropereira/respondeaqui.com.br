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
    return `${date.getHours()}:${date.getMinutes()}`;
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

// export function getRelativeTime(date) {
//   const today = new Date();
//   const yesterday = new Date(today);
//   yesterday.setDate(today.getDate() - 1);
//   const oneWeekAgo = new Date(today);
//   oneWeekAgo.setDate(today.getDate() - 7);

//   if (date <= today && date >= yesterday) {
//     return `${date.getHours()}:${date.getMinutes()}`;
//   } else if (date < yesterday && date >= oneWeekAgo) {
//     const daysOfWeek = [
//       "domingo",
//       "segunda",
//       "terça",
//       "quarta",
//       "quinta",
//       "sexta",
//       "sábado",
//     ];
//     return daysOfWeek[date.getDay()];
//   } else {
//     const dd = date.getDate();
//     const mm = date.getMonth() + 1;
//     const yyyy = date.getFullYear();
//     return `${dd < 10 ? "0" : ""}${dd}/${mm < 10 ? "0" : ""}${mm}/${yyyy}`;
//   }
// }

// export function lastMessageTime(date: Date) {
//   let now = new Date();
//   let diff = getDaysDifference(now, date);
//   let days = Math.floor(diff / 86400000);
//   let hours = date.getHours();
//   let minutes = date.getMinutes();
//   let monthNames = [
//     "Jan",
//     "Fev",
//     "Mar",
//     "Abr",
//     "Mai",
//     "Jun",
//     "Jul",
//     "Ago",
//     "Set",
//     "Out",
//     "Nov",
//     "Dez",
//   ];

//   let day = date.getDate();
//   let monthIndex = date.getMonth();
//   let year = date.getFullYear();
//   let formattedDate;

//   if (days === 0) {
//     formattedDate = hours + ":" + minutes;
//   } else if (days < 5) {
//     let relativeTime = "";

//     switch (days) {
//       case 1:
//         relativeTime = "Ontem";
//         break;
//       case 2:
//         relativeTime = "Há 2 dias";
//         break;
//       case 3:
//         relativeTime = "Há 3 dias";
//         break;
//       case 4:
//         relativeTime = "Há 4 dias";
//         break;
//     }

//     formattedDate = relativeTime + " às " + hours + ":" + minutes;
//   } else {
//     formattedDate = day + " " + monthNames[monthIndex] + " " + year;
//   }
//   return formattedDate;
// }

export function getDaysDifference(date1: Date, date2: Date) {
  const date1Object = new Date(date1);
  const date2Object = new Date(date2);

  const diffTime = Math.abs(date2Object.getTime() - date1Object.getTime());

  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}
