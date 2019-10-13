const commands_args = {
    forward: 1,
    fd: 1,
    backward: 1,
    bk: 1,
    right: 1,
    rt: 1,
    left: 1,
    lt: 1,
    clearscreen: 0,
    cs: 0,
    penup: 0,
    pu: 0,
    pendown: 0,
    pd: 0,
    home: 0,
    label: 1,
    setxy: 2,
    repeat: 2,
};

function lex(codeString) {
    return codeString.replace(/\]/g, ' ]').split(/[^\w\[\]]+|\b/); // TODO: better lexing
}

function parse() {
    return doParse(lex(document.getElementById('code').value))
}

function doParse(tokens) {
    let idx = 0;
    let commands = [];
    while (idx < tokens.length) {
        token = tokens[idx].trim();
        if (token === '') {
            idx++;
            continue;
        }
        if (commands_args[token] === undefined) {
            console.error("Unexpected token " + token);
            break;
        }
        if (token === 'repeat') {
            idx++;
            param = tokens[idx];
            idx++;
            let endBracketPos = findMatchingBracket(tokens, idx);
            if (tokens[idx] !== '[' || endBracketPos === undefined) {
                console.error('Invalid repeat bracket sequence');
                break;
            }
            let subcode = tokens.slice(idx + 1, endBracketPos);
            command = [token, param, doParse(subcode)];
            idx = endBracketPos;
        } else {
            command = [token];
            for (let _ = 0; _ < commands_args[token]; _++) {
                idx++;
                command.push(tokens[idx]);
            }
        }
        commands.push(command)
        idx++;
    }
    return commands;
}

function findMatchingBracket(tokens, bracketPosition) {
    let count = 1;
    let pos = bracketPosition + 1;
    while (pos < tokens.length) {
        if (tokens[pos] === '[') {
            count++;
        } else if (tokens[pos] === ']') {
            count--;
        }
        if (count === 0) {
            return pos;
        }
        pos++;
    }
    return undefined;
}