const fs = require('fs');
const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('Pitts_Kichenama Tree.ged')
});

let geno = {
  INDI: {},
  FAM: {},
  tree: {
    name: 'homo sapien',
    children: [],
  }
};


const LineParser = (Super) => (class extends Super {
  addLine (line) {
    switch (true) {
      default: return;
      case /^1/.test(line):
        switch (true) {
          default: return;
          case / NAME /i.test(line):
            this.set('fullname', line.match(/NAME (.+)$/i)[1].replace(/\//g, ''))
            let t = line.match(/\/(.+)\/$/i);
            (t && t.length && t[1]) && this.set('surname', t[1]);
            break;
          case / SEX /i.test(line):
            this.set('gender', line.match(/SEX (.+)$/i)[1])
            break;
          case / FAM. @/i.test(line):
            this.append('familyIds', line.match(/@(.+)@/i)[1])
            break;
          case / (HUSB|WIFE) @/i.test(line):
            this.append('parents', line.match(/@(.+)@/i)[1])
            break;
          case / CHIL @/i.test(line):
            this.append('children', line.match(/@(.+)@/i)[1])
            break;
        }
        break;
    }
  }
});

class GenoRecord {
  constructor () {
    this.id = '';
    this.data = {};
  }
  set (key, value) {
    this.data[key] = value;
  }
  append (key, value) {
    if (!this.data[key]) {
      this.data[key] = [value];
    } else {
      this.data[key] = [].concat(this.data[key], value);
    }
  }
}

class Indi extends GenoRecord {
  constructor (row) {
    super();
    this.id = row.match(/0 @(.+)@ INDI/i)[1];
    this.set('surname', '');
    this.set('fullname', '');
    this.set('gender', '');
    this.set('familyIds', []);
  }
}

class Fam extends GenoRecord {
  constructor (row) {
    super();
    this.id = row.match(/0 @(.+)@ FAM/i)[1];
    this.set('parents', []);
    this.set('children', []);
  }
}

class Person extends LineParser(Indi) {
  constructor (row) {
    super(row);
    this.set('children', []);
  }
  flatten () {
    let {id} = this,
      {surname, fullname: name, gender, children} = this.data;
    return {
      id,
      surname,
      name,
      gender,
      children,
    };
  }
  toString () {
    return JSON.stringify(this.data,null,2);
  }
}

class Family extends LineParser(Fam) {
  constructor (row) {
    super(row);
  }
  toString () {
    return JSON.stringify(this.data,null,2);
  }
}


let interested = new RegExp(`(${Object.keys(geno).join('|')}) +$`, 'i');
// let interested = /INDI +$/i;

lineReader.on('line', ((current) => (line) => {
  if (/^0/.test(line)) { current = false; }
  if (interested.test(line)) {
    switch (true) {
      default: current = false; break;
      case /INDI $/i.test(line):
        current = new Person(line);
        geno.INDI[current.id] = current;
        break;
      case /FAM $/i.test(line):
        current = new Family(line);
        geno.FAM[current.id] = current;
        break;
    }
  } else if (current) {
    current.addLine(line);
  }
} )(false));

function recursivelyFlatten (person) {
  let ret = person.flatten();
  ret.children = ret.children.map(recursivelyFlatten);
  return ret;
}

lineReader.on('close', () => {
  // write to file
  fs.writeFileSync('./people.json', JSON.stringify(geno.INDI, null, 2), 'utf-8');
  fs.writeFileSync('./families.json', JSON.stringify(geno.FAM, null, 2), 'utf-8');
  // for each person, add reference to their children
  for (const fid in geno.FAM) {
    let family = geno.FAM[fid];
    for (const pid of family.data.parents) {
      geno.INDI[pid].append('children', family.data.children.map((cid) => {
        geno.INDI[cid].isNode = true;
        return geno.INDI[cid];
      }));
    }
  }
  geno.tree.children = Object.keys(geno.INDI)
    // for each person
    .map((pid) => geno.INDI[pid] )
    // filter out those that are not someones child
    .filter((person) => !person.isNode )
    // flatten all the family lines
    .map(recursivelyFlatten);
  // write to file
  fs.writeFileSync('./tree.json', JSON.stringify(geno.tree, null, 2), 'utf-8');
})
