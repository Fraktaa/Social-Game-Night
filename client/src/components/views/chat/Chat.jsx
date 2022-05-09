import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
// import emotesObj2 from './Emotes.jsx';
import { io } from "socket.io-client";
const socket = io();

var BSB = {
  backgroundColor: '#1cd9ff'
}
var emotesObj = {
  ANELE: 'https://static-cdn.jtvnw.net/emoticons/v1/3792/1.0',
  ArgieBB: 'https://static-cdn.jtvnw.net/emoticons/v1/51838/1.0',
  ArsonNoSexy: 'https://static-cdn.jtvnw.net/emoticons/v1/50/1.0',
  AsexualPride: 'https://static-cdn.jtvnw.net/emoticons/v1/307827267/1.0',
  AsianGlow: 'https://static-cdn.jtvnw.net/emoticons/v1/74/1.0',
  'B)': 'https://static-cdn.jtvnw.net/emoticons/v1/555555577/1.0',
  BCWarrior: 'https://static-cdn.jtvnw.net/emoticons/v1/30/1.0',
  BOP: 'https://static-cdn.jtvnw.net/emoticons/v1/301428702/1.0',
  BabyRage: 'https://static-cdn.jtvnw.net/emoticons/v1/22639/1.0',
  BatChest: 'https://static-cdn.jtvnw.net/emoticons/v1/115234/1.0',
  BegWan: 'https://static-cdn.jtvnw.net/emoticons/v1/160394/1.0',
  BibleThump: 'https://static-cdn.jtvnw.net/emoticons/v1/86/1.0',
  BigBrother: 'https://static-cdn.jtvnw.net/emoticons/v1/1904/1.0',
  BigPhish: 'https://static-cdn.jtvnw.net/emoticons/v1/160395/1.0',
  BisexualPride: 'https://static-cdn.jtvnw.net/emoticons/v1/307827313/1.0',
  BlackLivesMatter: 'https://static-cdn.jtvnw.net/emoticons/v1/302537250/1.0',
  BlargNaut: 'https://static-cdn.jtvnw.net/emoticons/v1/114738/1.0',
  BloodTrail: 'https://static-cdn.jtvnw.net/emoticons/v1/69/1.0',
  BrainSlug: 'https://static-cdn.jtvnw.net/emoticons/v1/115233/1.0',
  BrokeBack: 'https://static-cdn.jtvnw.net/emoticons/v1/4057/1.0',
  BuddhaBar: 'https://static-cdn.jtvnw.net/emoticons/v1/27602/1.0',
  CaitlynS: 'https://static-cdn.jtvnw.net/emoticons/v1/emotesv2_4acac638cffb4db49f376059f7077dae/1.0',
  CarlSmile: 'https://static-cdn.jtvnw.net/emoticons/v1/166266/1.0',
  ChefFrank: 'https://static-cdn.jtvnw.net/emoticons/v1/90129/1.0',
  CoolCat: 'https://static-cdn.jtvnw.net/emoticons/v1/58127/1.0',
  CoolStoryBob: 'https://static-cdn.jtvnw.net/emoticons/v1/123171/1.0',
  CorgiDerp: 'https://static-cdn.jtvnw.net/emoticons/v1/49106/1.0',
  CrreamAwk: 'https://static-cdn.jtvnw.net/emoticons/v1/191313/1.0',
  CurseLit: 'https://static-cdn.jtvnw.net/emoticons/v1/116625/1.0',
  DAESuppy: 'https://static-cdn.jtvnw.net/emoticons/v1/973/1.0',
  DBstyle: 'https://static-cdn.jtvnw.net/emoticons/v1/73/1.0',
  DansGame: 'https://static-cdn.jtvnw.net/emoticons/v1/33/1.0',
  DarkKnight: 'https://static-cdn.jtvnw.net/emoticons/v1/emotesv2_d9567e500d78441793bee538dcabc1da/1.0',
  DarkMode: 'https://static-cdn.jtvnw.net/emoticons/v1/461298/1.0',
  DatSheffy: 'https://static-cdn.jtvnw.net/emoticons/v1/111700/1.0',
  DendiFace: 'https://static-cdn.jtvnw.net/emoticons/v1/58135/1.0',
  DogFace: 'https://static-cdn.jtvnw.net/emoticons/v1/114835/1.0',
  DoritosChip: 'https://static-cdn.jtvnw.net/emoticons/v1/102242/1.0',
  DxCat: 'https://static-cdn.jtvnw.net/emoticons/v1/110734/1.0',
  EarthDay: 'https://static-cdn.jtvnw.net/emoticons/v1/959018/1.0',
  EleGiggle: 'https://static-cdn.jtvnw.net/emoticons/v1/4339/1.0',
  EntropyWins: 'https://static-cdn.jtvnw.net/emoticons/v1/376765/1.0',
  ExtraLife: 'https://static-cdn.jtvnw.net/emoticons/v1/302426269/1.0',
  FBBlock: 'https://static-cdn.jtvnw.net/emoticons/v1/1441276/1.0',
  FBCatch: 'https://static-cdn.jtvnw.net/emoticons/v1/1441281/1.0',
  FBChallenge: 'https://static-cdn.jtvnw.net/emoticons/v1/1441285/1.0',
  FBPass: 'https://static-cdn.jtvnw.net/emoticons/v1/1441271/1.0',
  FBPenalty: 'https://static-cdn.jtvnw.net/emoticons/v1/1441289/1.0',
  FBRun: 'https://static-cdn.jtvnw.net/emoticons/v1/1441261/1.0',
  FBSpiral: 'https://static-cdn.jtvnw.net/emoticons/v1/1441273/1.0',
  FBtouchdown: 'https://static-cdn.jtvnw.net/emoticons/v1/626795/1.0',
  FUNgineer: 'https://static-cdn.jtvnw.net/emoticons/v1/244/1.0',
  FailFish: 'https://static-cdn.jtvnw.net/emoticons/v1/360/1.0',
  FamilyMan: 'https://static-cdn.jtvnw.net/emoticons/v1/emotesv2_89f3f0761c7b4f708061e9e4be3b7d17/1.0',
  FootBall: 'https://static-cdn.jtvnw.net/emoticons/v1/302628600/1.0',
  FootGoal: 'https://static-cdn.jtvnw.net/emoticons/v1/302628600/1.0',
  FootYellow: 'https://static-cdn.jtvnw.net/emoticons/v1/302628613/1.0',
  FrankerZ: 'https://static-cdn.jtvnw.net/emoticons/v1/65/1.0',
  FreakinStinkin: 'https://static-cdn.jtvnw.net/emoticons/v1/117701/1.0',
  FutureMan: 'https://static-cdn.jtvnw.net/emoticons/v1/98562/1.0',
  GayPride: 'https://static-cdn.jtvnw.net/emoticons/v1/307827321/1.0',
  GenderFluidPride: 'https://static-cdn.jtvnw.net/emoticons/v1/307827326/1.0',
  GingerPower: 'https://static-cdn.jtvnw.net/emoticons/v1/32/1.0',
  GivePLZ: 'https://static-cdn.jtvnw.net/emoticons/v1/112291/1.0',
  GlitchCat: 'https://static-cdn.jtvnw.net/emoticons/v1/304486301/1.0',
  GlitchLit: 'https://static-cdn.jtvnw.net/emoticons/v1/304489128/1.0',
  GlitchNRG: 'https://static-cdn.jtvnw.net/emoticons/v1/304489309/1.0',
  GrammarKing: 'https://static-cdn.jtvnw.net/emoticons/v1/3632/1.0',
  GunRun: 'https://static-cdn.jtvnw.net/emoticons/v1/1584743/1.0',
  HSCheers: 'https://static-cdn.jtvnw.net/emoticons/v1/444572/1.0',
  HSWP: 'https://static-cdn.jtvnw.net/emoticons/v1/446979/1.0',
  HarleyWink: 'https://static-cdn.jtvnw.net/emoticons/v1/emotesv2_8b0ac3eee4274a75868e3d0686d7b6f7/1.0',
  HassaanChop: 'https://static-cdn.jtvnw.net/emoticons/v1/20225/1.0',
  HeyGuys: 'https://static-cdn.jtvnw.net/emoticons/v1/30259/1.0',
  HolidayCookie: 'https://static-cdn.jtvnw.net/emoticons/v1/1713813/1.0',
  HolidayLog: 'https://static-cdn.jtvnw.net/emoticons/v1/1713816/1.0',
  HolidayPresent: 'https://static-cdn.jtvnw.net/emoticons/v1/1713819/1.0',
  HolidaySanta: 'https://static-cdn.jtvnw.net/emoticons/v1/1713822/1.0',
  HolidayTree: 'https://static-cdn.jtvnw.net/emoticons/v1/1713825/1.0',
  HotPokket: 'https://static-cdn.jtvnw.net/emoticons/v1/357/1.0',
  HungryPaimon: 'https://static-cdn.jtvnw.net/emoticons/v1/emotesv2_535e40afa0b34a9481997627b1b47d96/1.0',
  ImTyping: 'https://static-cdn.jtvnw.net/emoticons/v1/emotesv2_b0c6ccb3b12b4f99a9cc83af365a09f1/1.0',
  IntersexPride: 'https://static-cdn.jtvnw.net/emoticons/v1/307827332/1.0',
  InuyoFace: 'https://static-cdn.jtvnw.net/emoticons/v1/160396/1.0',
  ItsBoshyTime: 'https://static-cdn.jtvnw.net/emoticons/v1/133468/1.0',
  JKanStyle: 'https://static-cdn.jtvnw.net/emoticons/v1/15/1.0',
  Jebaited: 'https://static-cdn.jtvnw.net/emoticons/v1/114836/1.0',
  Jebasted: 'https://static-cdn.jtvnw.net/emoticons/v1/emotesv2_031bf329c21040a897d55ef471da3dd3/1.0',
  JonCarnage: 'https://static-cdn.jtvnw.net/emoticons/v1/26/1.0',
  KAPOW: 'https://static-cdn.jtvnw.net/emoticons/v1/133537/1.0',
  KEKHeim: 'https://static-cdn.jtvnw.net/emoticons/v1/emotesv2_7c5d25facc384c47963d25a5057a0b40/1.0',
  Kekw: 'https://i.kym-cdn.com/photos/images/masonry/001/564/945/0cd.png',
  Kappa: 'https://static-cdn.jtvnw.net/emoticons/v1/25/1.0',
  KappaClaus: 'https://static-cdn.jtvnw.net/emoticons/v1/74510/1.0',
  KappaPride: 'https://static-cdn.jtvnw.net/emoticons/v1/55338/1.0',
  KappaRoss: 'https://static-cdn.jtvnw.net/emoticons/v1/70433/1.0',
  KappaWealth: 'https://static-cdn.jtvnw.net/emoticons/v1/81997/1.0',
  Kappu: 'https://static-cdn.jtvnw.net/emoticons/v1/160397/1.0',
  Keepo: 'https://static-cdn.jtvnw.net/emoticons/v1/1902/1.0',
  KevinTurtle: 'https://static-cdn.jtvnw.net/emoticons/v1/40/1.0',
  Kippa: 'https://static-cdn.jtvnw.net/emoticons/v1/1901/1.0',
  KomodoHype: 'https://static-cdn.jtvnw.net/emoticons/v1/81273/1.0',
  KonCha: 'https://static-cdn.jtvnw.net/emoticons/v1/160400/1.0',
  Korok: 'https://ih1.redbubble.net/image.353960561.5363/st,small,507x507-pad,600x600,f8f8f8.u4.jpg',
  Kreygasm: 'https://static-cdn.jtvnw.net/emoticons/v1/41/1.0',
  Link: 'https://www.kindpng.com/picc/m/320-3201943_zelda-link-png-transparent-png.png',
  LUL: 'https://static-cdn.jtvnw.net/emoticons/v1/425618/1.0',
  LaundryBasket: 'https://static-cdn.jtvnw.net/emoticons/v1/emotesv2_ecb0bfd49b3c4325864b948d46c8152b/1.0',
  LesbianPride: 'https://static-cdn.jtvnw.net/emoticons/v1/307827340/1.0',
  MVGame: 'https://static-cdn.jtvnw.net/emoticons/v1/142140/1.0',
  Mau5: 'https://static-cdn.jtvnw.net/emoticons/v1/30134/1.0',
  MaxLOL: 'https://static-cdn.jtvnw.net/emoticons/v1/1290325/1.0',
  MercyWing1: 'https://static-cdn.jtvnw.net/emoticons/v1/1003187/1.0',
  MercyWing2: 'https://static-cdn.jtvnw.net/emoticons/v1/1003189/1.0',
  MikeHogu: 'https://static-cdn.jtvnw.net/emoticons/v1/81636/1.0',
  MingLee: 'https://static-cdn.jtvnw.net/emoticons/v1/68856/1.0',
  ModLove: 'https://static-cdn.jtvnw.net/emoticons/v1/emotesv2_a2dfbbbbf66f4a75b0f53db841523e6c/1.0',
  MorphinTime: 'https://static-cdn.jtvnw.net/emoticons/v1/156787/1.0',
  MrDestructoid: 'https://static-cdn.jtvnw.net/emoticons/v1/28/1.0',
  MyAvatar: 'https://static-cdn.jtvnw.net/emoticons/v1/emotesv2_c0c9c932c82244ff920ad2134be90afb/1.0',
  NewRecord: 'https://static-cdn.jtvnw.net/emoticons/v1/307763444/1.0',
  NinjaGrumpy: 'https://static-cdn.jtvnw.net/emoticons/v1/138325/1.0',
  NomNom: 'https://static-cdn.jtvnw.net/emoticons/v1/90075/1.0',
  NonbinaryPride: 'https://static-cdn.jtvnw.net/emoticons/v1/307827356/1.0',
  NotATK: 'https://static-cdn.jtvnw.net/emoticons/v1/34875/1.0',
  NotLikeThis: 'https://static-cdn.jtvnw.net/emoticons/v1/58765/1.0',
  "O.O": 'https://static-cdn.jtvnw.net/emoticons/v1/555555572/1.0',
  "O.o": 'https://static-cdn.jtvnw.net/emoticons/v1/555555570/1.0',
  OSFrog: 'https://static-cdn.jtvnw.net/emoticons/v1/81248/1.0',
  "O_O": 'https://static-cdn.jtvnw.net/emoticons/v1/555555571/1.0',
  "O_o": 'https://static-cdn.jtvnw.net/emoticons/v1/555555569/1.0',
  "O_o": 'https://static-cdn.jtvnw.net/emoticons/v1/555555569/1.0',
  OhMyDog: 'https://static-cdn.jtvnw.net/emoticons/v1/81103/1.0',
  OneHand: 'https://static-cdn.jtvnw.net/emoticons/v1/66/1.0',
  OpieOP: 'https://static-cdn.jtvnw.net/emoticons/v1/100590/1.0',
  OptimizePrime: 'https://static-cdn.jtvnw.net/emoticons/v1/16/1.0',
  PJSalt: 'https://static-cdn.jtvnw.net/emoticons/v1/36/1.0',
  PJSugar: 'https://static-cdn.jtvnw.net/emoticons/v1/102556/1.0',
  PMSTwin: 'https://static-cdn.jtvnw.net/emoticons/v1/92/1.0',
  PRChase: 'https://static-cdn.jtvnw.net/emoticons/v1/28328/1.0',
  PanicVis: 'https://static-cdn.jtvnw.net/emoticons/v1/3668/1.0',
  PansexualPride: 'https://static-cdn.jtvnw.net/emoticons/v1/307827370/1.0',
  PartyHat: 'https://static-cdn.jtvnw.net/emoticons/v1/965738/1.0',
  PartyTime: 'https://static-cdn.jtvnw.net/emoticons/v1/135393/1.0',
  PeoplesChamp: 'https://static-cdn.jtvnw.net/emoticons/v1/3412/1.0',
  PepeLaugh: 'https://www.streamscheme.com/wp-content/uploads/2020/08/pepelaugh-emote.png',
  PermaSmug: 'https://static-cdn.jtvnw.net/emoticons/v1/27509/1.0',
  PicoMause: 'https://static-cdn.jtvnw.net/emoticons/v1/111300/1.0',
  PinkMercy: 'https://static-cdn.jtvnw.net/emoticons/v1/1003190/1.0',
  PipeHype: 'https://static-cdn.jtvnw.net/emoticons/v1/4240/1.0',
  PixelBob: 'https://static-cdn.jtvnw.net/emoticons/v1/1547903/1.0',
  PizzaTime: 'https://static-cdn.jtvnw.net/emoticons/v1/emotesv2_f202746ed88f4e7c872b50b1f7fd78cc/1.0',
  PogBones: 'https://static-cdn.jtvnw.net/emoticons/v1/emotesv2_30050f4353aa4322b25b6b044703e5d1/1.0',
  PogChamp: 'https://static-cdn.jtvnw.net/emoticons/v1/305954156/1.0',
  Poooound: 'https://static-cdn.jtvnw.net/emoticons/v1/117484/1.0',
  PopCorn: 'https://static-cdn.jtvnw.net/emoticons/v1/724216/1.0',
  PoroSad: 'https://static-cdn.jtvnw.net/emoticons/v1/emotesv2_4c39207000564711868f3196cc0a8748/1.0',
  PotFriend: 'https://static-cdn.jtvnw.net/emoticons/v1/emotesv2_e02650251d204198923de93a0c62f5f5/1.0',
  PowerUpL: 'https://static-cdn.jtvnw.net/emoticons/v1/425688/1.0',
  PowerUpR: 'https://static-cdn.jtvnw.net/emoticons/v1/425671/1.0',
  PraiseIt: 'https://static-cdn.jtvnw.net/emoticons/v1/38586/1.0',
  PrimeMe: 'https://static-cdn.jtvnw.net/emoticons/v1/115075/1.0',
  PunOko: 'https://static-cdn.jtvnw.net/emoticons/v1/160401/1.0',
  PunchTrees: 'https://static-cdn.jtvnw.net/emoticons/v1/47/1.0',
  "R)": 'https://static-cdn.jtvnw.net/emoticons/v1/14/1.0',
  "R)": 'https://static-cdn.jtvnw.net/emoticons/v1/14/1.0',
  "R-)": 'https://static-cdn.jtvnw.net/emoticons/v1/14/1.0',
  RaccAttack: 'https://static-cdn.jtvnw.net/emoticons/v1/114870/1.0',
  RalpherZ: 'https://static-cdn.jtvnw.net/emoticons/v1/1900/1.0',
  RedCoat: 'https://static-cdn.jtvnw.net/emoticons/v1/22/1.0',
  ResidentSleeper: 'https://static-cdn.jtvnw.net/emoticons/v1/245/1.0',
  RitzMitz: 'https://static-cdn.jtvnw.net/emoticons/v1/4338/1.0',
  RlyTho: 'https://static-cdn.jtvnw.net/emoticons/v1/134256/1.0',
  RuleFive: 'https://static-cdn.jtvnw.net/emoticons/v1/107030/1.0',
  RyuChamp: 'https://static-cdn.jtvnw.net/emoticons/v1/emotesv2_0ebc590ba68447269831af61d8bc9e0d/1.0',
  SMOrc: 'https://static-cdn.jtvnw.net/emoticons/v1/52/1.0',
  SSSsss: 'https://static-cdn.jtvnw.net/emoticons/v1/46/1.0',
  SabaPing: 'https://static-cdn.jtvnw.net/emoticons/v1/160402/1.0',
  SeemsGood: 'https://static-cdn.jtvnw.net/emoticons/v1/64138/1.0',
  SeriousSloth: 'https://static-cdn.jtvnw.net/emoticons/v1/81249/1.0',
  ShadyLulu: 'https://static-cdn.jtvnw.net/emoticons/v1/52492/1.0',
  ShazBotstix: 'https://static-cdn.jtvnw.net/emoticons/v1/87/1.0',
  Shush: 'https://static-cdn.jtvnw.net/emoticons/v1/emotesv2_819621bcb8f44566a1bd8ea63d06c58f/1.0',
  SingsMic: 'https://static-cdn.jtvnw.net/emoticons/v1/300116349/1.0',
  SingsNote: 'https://static-cdn.jtvnw.net/emoticons/v1/300116350/1.0',
  SmoocherZ: 'https://static-cdn.jtvnw.net/emoticons/v1/89945/1.0',
  SoBayed: 'https://static-cdn.jtvnw.net/emoticons/v1/1906/1.0',
  SoonerLater: 'https://static-cdn.jtvnw.net/emoticons/v1/2113050/1.0',
  Squid1: 'https://static-cdn.jtvnw.net/emoticons/v1/191762/1.0',
  Squid2: 'https://static-cdn.jtvnw.net/emoticons/v1/191763/1.0',
  Squid3: 'https://static-cdn.jtvnw.net/emoticons/v1/191764/1.0',
  Squid4: 'https://static-cdn.jtvnw.net/emoticons/v1/191767/1.0',
  StinkyCheese: 'https://static-cdn.jtvnw.net/emoticons/v1/90076/1.0',
  StinkyGlitch: 'https://static-cdn.jtvnw.net/emoticons/v1/304486324/1.0',
  StoneLightning: 'https://static-cdn.jtvnw.net/emoticons/v1/17/1.0',
  StrawBeary: 'https://static-cdn.jtvnw.net/emoticons/v1/114876/1.0',
  SuperVinlin: 'https://static-cdn.jtvnw.net/emoticons/v1/118772/1.0',
  SwiftRage: 'https://static-cdn.jtvnw.net/emoticons/v1/34/1.0',
  TBAngel: 'https://static-cdn.jtvnw.net/emoticons/v1/143490/1.0',
  TF2John: 'https://static-cdn.jtvnw.net/emoticons/v1/1899/1.0',
  TPFufun: 'https://static-cdn.jtvnw.net/emoticons/v1/508650/1.0',
  TPcrunchyroll: 'https://static-cdn.jtvnw.net/emoticons/v1/323914/1.0',
  TTours: 'https://static-cdn.jtvnw.net/emoticons/v1/38436/1.0',
  TakeNRG: 'https://static-cdn.jtvnw.net/emoticons/v1/112292/1.0',
  TearGlove: 'https://static-cdn.jtvnw.net/emoticons/v1/160403/1.0',
  TehePelo: 'https://static-cdn.jtvnw.net/emoticons/v1/160404/1.0',
  ThankEgg: 'https://static-cdn.jtvnw.net/emoticons/v1/160392/1.0',
  TheIlluminati: 'https://static-cdn.jtvnw.net/emoticons/v1/145315/1.0',
  TheRinger: 'https://static-cdn.jtvnw.net/emoticons/v1/18/1.0',
  TheTarFu: 'https://static-cdn.jtvnw.net/emoticons/v1/111351/1.0',
  TheThing: 'https://static-cdn.jtvnw.net/emoticons/v1/7427/1.0',
  ThunBeast: 'https://static-cdn.jtvnw.net/emoticons/v1/1898/1.0',
  TinyFace: 'https://static-cdn.jtvnw.net/emoticons/v1/111119/1.0',
  TombRaid: 'https://static-cdn.jtvnw.net/emoticons/v1/864205/1.0',
  TooSpicy: 'https://static-cdn.jtvnw.net/emoticons/v1/114846/1.0',
  TransgenderPride: 'https://static-cdn.jtvnw.net/emoticons/v1/307827377/1.0',
  TriHard: 'https://static-cdn.jtvnw.net/emoticons/v1/120232/1.0',
  TwitchLit: 'https://static-cdn.jtvnw.net/emoticons/v1/166263/1.0',
  TwitchRPG: 'https://static-cdn.jtvnw.net/emoticons/v1/1220086/1.0',
  TwitchSings: 'https://static-cdn.jtvnw.net/emoticons/v1/300116344/1.0',
  witchUnity: 'https://static-cdn.jtvnw.net/emoticons/v1/196892/1.0',
  TwitchVotes: 'https://static-cdn.jtvnw.net/emoticons/v1/479745/1.0',
  UWot: 'https://static-cdn.jtvnw.net/emoticons/v1/134255/1.0',
  UnSane: 'https://static-cdn.jtvnw.net/emoticons/v1/111792/1.0',
  UncleNox: 'https://static-cdn.jtvnw.net/emoticons/v1/114856/1.0',
  VirtualHug: 'https://static-cdn.jtvnw.net/emoticons/v1/301696583/1.0',
  VoHiYo: 'https://static-cdn.jtvnw.net/emoticons/v1/81274/1.0',
  VoteNay: 'https://static-cdn.jtvnw.net/emoticons/v1/106294/1.0',
  VoteYea: 'https://static-cdn.jtvnw.net/emoticons/v1/106293/1.0',
  WTRuck: 'https://static-cdn.jtvnw.net/emoticons/v1/114847/1.0',
  WholeWheat: 'https://static-cdn.jtvnw.net/emoticons/v1/1896/1.0',
  WhySoSerious: 'https://static-cdn.jtvnw.net/emoticons/v1/emotesv2_1fda4a1b40094c93af334f8b60868a7c/1.0',
  WutFace: 'https://static-cdn.jtvnw.net/emoticons/v1/28087/1.0',
  YouDontSay: 'https://static-cdn.jtvnw.net/emoticons/v1/134254/1.0',
  YouWHY: 'https://static-cdn.jtvnw.net/emoticons/v1/4337/1.0',
  bleedPurple: 'https://static-cdn.jtvnw.net/emoticons/v1/62835/1.0',
  cmonBruh: 'https://static-cdn.jtvnw.net/emoticons/v1/84608/1.0',
  copyThis: 'https://static-cdn.jtvnw.net/emoticons/v1/112288/1.0',
  duDudu: 'https://static-cdn.jtvnw.net/emoticons/v1/62834/1.0',
  imGlitch: 'https://static-cdn.jtvnw.net/emoticons/v1/112290/1.0',
  mcaT: 'https://static-cdn.jtvnw.net/emoticons/v1/35063/1.0',
  "o.O": 'https://static-cdn.jtvnw.net/emoticons/v1/555555574/1.0',
  "o.o": 'https://static-cdn.jtvnw.net/emoticons/v1/555555574/1.0',
  "o_O": 'https://static-cdn.jtvnw.net/emoticons/v1/555555574/1.0',
  "o_o": 'https://static-cdn.jtvnw.net/emoticons/v1/555555574/1.0',
  panicBasket: 'https://static-cdn.jtvnw.net/emoticons/v1/22998/1.0',
  pastaThat: 'https://static-cdn.jtvnw.net/emoticons/v1/112289/1.0',
  riPepperonis: 'https://static-cdn.jtvnw.net/emoticons/v1/62833/1.0',
  twitchRaid: 'https://static-cdn.jtvnw.net/emoticons/v1/62836/1.0'
}
socket.on('chat message', function(msg) {
  // setMessages([...messages, JSON.parse(msg)]);
  var msg = JSON.parse(msg)
  checkEmotes(msg)
});

const checkEmotes=(chatcontent)=>{
  var user = chatcontent.user
  var text = chatcontent.text
  let div = document.getElementById('messageContainer')
  let li = document.createElement("li")
  var array = text.split(' ');
  li.append(`${user}: `)
  array.forEach((word)=>{
    if (word[0] === ':') {
      let img = document.createElement("img")
      var emote = word.split('').slice(1).join('')
      var emoteURL = emotesObj[emote]
      img.src = `${emoteURL}`
      img.height = "40"
      li.append(img)
    } else {
      li.append(`${word} `)
    }
  })
  div.prepend(li)
  document.getElementById('inputChat').value = '';
}

export default function Chat ({buttonStyle}) {
  const [chatContent, setChatContent] = useState('');
  const [messages, setMessages] = useState([{user: '', text:'This is the end of the chat history'},
]);

  const [text, setText] = useState('');
  const [user, setUser] = useState('MrJoel');

  useEffect(()=>{
    document.getElementById("inputChat")
    .addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.keyCode === 13) {
        document.getElementById("buttonChat").click();
      }
    });
  }, [])

  const shuffleEmotes=()=>{
    var keysArray = Object.keys(emotesObj)
    var randomKey = keysArray[Math.floor(Math.random()*keysArray.length)]
    setChatContent(`${randomKey} :${randomKey}`)
    handleSubmit(null)
    // let div = document.getElementById('messageContainer')
    // let li = document.createElement("li")
    // let img = document.createElement("img")
    // var keysArray = Object.keys(emotesObj)
    // var randomKey = keysArray[Math.floor(Math.random()*keysArray.length)]
    // img.src = `${emotesObj[randomKey]}`
    // img.height = "40"
    // li.append(`${user}: :${randomKey}`)
    // li.append(img)
    // div.prepend(li)
    }
  const handleSubmit=(e)=>{
    if (e) {
      e.preventDefault();
    }
    socket.emit('chat message', JSON.stringify({user: user, text: chatContent}));
  }
  var count = 0;
  return (
    <>
      <div className="chatContainer" >
        <div className="chatDiv" >
          <h1>Chat Room</h1>
          <ul id="messageContainer" className="messageContainer" style={{width: '80%', borderStyle: 'solid', margin: '10px', float: 'left', overflowY:'scroll', overflow: 'scroll', height: '200px', fontSize: '18px', display: 'flex', flexDirection: 'column-reverse', listStyleType: 'none'
        }}>
            {messages.map((obj)=>{
              return <li key={count+=1}>{obj.user}: {obj.text}</li>
            })}
          </ul>
        <input id="inputChat" type="text" placeholder="New Message" style={{fontSize:'22px'}} onChange={(e)=>{setChatContent(e.target.value)}}></input>
        <button id="buttonChat"style={{...buttonStyle, ...BSB}} onClick={(e)=>{
          handleSubmit(e)
        }}>Send</button>
        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Icon-round-Question_mark.svg/1024px-Icon-round-Question_mark.svg.png' height="30" onClick={()=>{
          var emoteString = '';
          for (var key in emotesObj) {
            emoteString += `:${key}, `
          }
          alert(emoteString)
        }}></img>
          <img src='https://cdn-icons-png.flaticon.com/512/3580/3580329.png' height="30" onClick={()=>{shuffleEmotes()}}></img>
        </div>
      </div>
    </>
  )
}